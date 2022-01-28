import { type FormEvent, useState } from 'react';
import { Domains } from '@prisma/client';
import { useRouter } from 'next/router';
import { Form, validateContent } from './content';

export function EditDomain({ domain = {} }: { domain: Domains }) {
  const [name, setName] = useState(domain.name);
  const router = useRouter();

  async function submit(e: FormEvent) {
    e.preventDefault();
    const type = (e.currentTarget.type as HTMLInputElement).value;
    const content = (e.currentTarget.content as HTMLInputElement).value;

    if (!validateContent(type, content)) {
      return;
    }

    const form = {
      id: domain.id,
      type,
      content,
      proxied: (e.currentTarget.proxied as HTMLInputElement).checked
    };
    const res = await fetch(`/api/domain/update`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'content-type': 'application/json'
      }
    });
    const result = (await res.json()) as { success: boolean; id: string };
    if (result.success) {
      alert('保存成功！');
      router.reload();
    } else {
      alert('出错啦！请稍后重试');
    }
  }

  async function submitDelete(e: FormEvent) {
    e.preventDefault();
    const confirmed = confirm('确定要删除吗？被删除的域名将不能够被再次注册哦');
    if (!confirmed) {
      return;
    }
    const res = await fetch(`/api/domain/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ id: domain.id }),
      headers: {
        'content-type': 'application/json'
      }
    });
    const result = (await res.json()) as { success: boolean; id: string };
    if (result.success) {
      alert('删除成功！');
      router.reload();
    } else {
      alert('出错啦！请稍后重试');
    }
  }

  return (
    <form onSubmit={submit}>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>
            您是第{' '}
            <div className='badge badge-primary badge-lg'>{domain.no}</div>{' '}
            号用户
          </span>
        </label>
      </div>
      <div className='form-control'>
        <div className='relative'>
          <input
            type='text'
            placeholder='域名'
            name='name'
            defaultValue={name}
            disabled
            className='w-full pr-16 input input-secondary input-bordered'
            onChange={(e) => setName(e.target.value.trim())}
          />
          <div className='absolute top-0 right-0 rounded-l-none'>
            <button disabled className='btn btn-primary'>
              .憨憨.我爱你
            </button>
          </div>
        </div>
      </div>

      <Form domain={domain} />
      <div className='flex flex-row justify-center mt-2'>
        <button type='submit' className='btn btn-primary'>
          保存
        </button>
        <div className='divider divider-vertical'></div>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={submitDelete}>
          删除
        </button>
      </div>
    </form>
  );
}
