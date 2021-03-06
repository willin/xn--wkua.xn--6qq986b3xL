import clsx from 'classnames';
import { toASCII } from 'punycode';
import { useEffect, useState, type SyntheticEvent } from 'react';
import { DomainType } from '@prisma/client';
import { useRouter } from 'next/router';
import { Form, validateContent } from './content';

export function CreateDomain() {
  const [name, setName] = useState('');
  const [valid, setValid] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setValid(false);
  }, [name]);

  async function searchDomain(e: SyntheticEvent) {
    e.preventDefault();
    const res = await fetch(
      `/api/domain/search?name=${encodeURIComponent(name)}`,
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
    const target = e.currentTarget as typeof e.currentTarget & {
      type: { value: DomainType };
      content: { value: string };
      proxied: { checked: boolean };
    };
    const type = target.type.value;
    const content = target.content.value;
    if (!validateContent(type, content)) {
      return;
    }
    const form = {
      type,
      content,
      proxied: target.proxied.checked,
      name,
      punycode: toASCII(name)
    };
    const res = await fetch(`/api/domain/create`, {
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
          <span className='label-text'>搜索域名</span>
        </label>

        <div className='relative'>
          <input
            type='text'
            placeholder='域名'
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
              onClick={searchDomain}>
              .憨憨.我爱你
            </button>
          </div>
        </div>
      </div>

      {valid && <Form domain={{ name }} />}

      <button type='submit' className='btn btn-primary mt-2' disabled={!valid}>
        注册
      </button>
    </form>
  );
}
