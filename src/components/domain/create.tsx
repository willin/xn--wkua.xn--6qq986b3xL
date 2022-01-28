import clsx from 'classnames';
import { toASCII } from 'punycode';
import { type FormEvent, useState } from 'react';
import { Domains } from '@prisma/client';
import { useRouter } from 'next/router';
import { Form, validateContent } from './content';

export function CreateDomain({ domain = {} }: { domain: Domains }) {
  const [name, setName] = useState(domain.name);
  const [valid, setValid] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  async function searchDomain(e: FormEvent) {
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

  async function submit(e: FormEvent) {
    e.preventDefault();
    const type = (e.currentTarget.type as HTMLInputElement).value;
    const content = (e.currentTarget.content as HTMLInputElement).value;
    if (!validateContent(type, content)) {
      return;
    }
    const form = {
      type,
      content,
      proxied: (e.currentTarget.proxied as HTMLInputElement).checked,
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

      <button type='submit' className='btn btn-primary' disabled={!valid}>
        注册
      </button>
    </form>
  );
}
