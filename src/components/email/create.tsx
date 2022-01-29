import clsx from 'classnames';
import { useRouter } from 'next/router';
import { toASCII } from 'punycode';
import { SyntheticEvent, useEffect, useState } from 'react';
import { validateEmail } from '../../lib/utils';

export function CreateEmail() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [valid, setValid] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setValid(false);
  }, [name]);

  async function searchEmail(e: SyntheticEvent) {
    e.preventDefault();
    const res = await fetch(
      `/api/email/search?name=${encodeURIComponent(name)}`,
      {
        method: 'POST'
      }
    );
    const { valid = false } = ((await res.json()) as { valid: boolean }) || {};
    setValid(valid);
    setChecked(true);
  }

  async function submit(e: SyntheticEvent) {
    e.preventDefault();
    if (!validateEmail(content)) {
      return;
    }
    const form = {
      content,
      name,
      punycode: toASCII(name)
    };
    const res = await fetch(`/api/email/create`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json'
      }
    });
    const result = (await res.json()) as { success: boolean; id: string };
    if (result.success) {
      router.reload();
    } else {
      alert('出错啦！请稍后重试');
    }
  }

  return (
    <form onSubmit={submit}>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>搜索地址</span>
        </label>

        <div className='relative'>
          <input
            type='text'
            placeholder='地址'
            name='name'
            defaultValue={name}
            className={clsx('w-full pr-16 input input-bordered', {
              'input-error': checked && !valid,
              'input-secondary': !checked || valid
            })}
            onChange={(e) => setName(e.target.value.trim())}
          />
          <div
            data-tip='点击校验'
            className='absolute top-0 right-0 rounded-l-none tooltip tooltip-open'>
            <button
              disabled={name === ''}
              className={clsx('btn', {
                'btn-primary': !checked || valid,
                'btn-error': checked && !valid
              })}
              onClick={searchEmail}>
              @憨憨.我爱你
            </button>
          </div>
        </div>
      </div>

      {valid && (
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>转发邮箱</span>
          </label>
          <input
            type='text'
            name='content'
            placeholder='yourname@qq.com'
            defaultValue={content}
            onChange={(e) => setContent(e.target.value.trim())}
            className={clsx('input', {
              'input-error': !validateEmail(content),
              'input-bordered': !validateEmail(content)
            })}
          />
          {content && !validateEmail(content) && (
            <label className='label'>
              <span className='label-text-alt'>输入邮箱的格式不正确</span>
            </label>
          )}
        </div>
      )}

      <button
        type='submit'
        className='btn btn-primary mt-2'
        disabled={!valid || !validateEmail(content)}>
        注册
      </button>
    </form>
  );
}
