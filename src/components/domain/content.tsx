import { useState } from 'react';
import { toASCII } from 'punycode';
import clsx from 'classnames';
import { Domains, DomainType } from '@prisma/client';
import { validateDomain, validateIpv4, validateIpv6 } from '../../lib/utils';

function getPlaceHolder(type: DomainType) {
  switch (type) {
    case DomainType.A: {
      return '1.2.3.4';
    }
    case DomainType.AAAA: {
      return '2001:4860:4860::8888';
    }
    default: {
      return 'willin.github.io';
    }
  }
}

export function validateContent(t: DomainType, c: string) {
  switch (t) {
    case DomainType.A: {
      return validateIpv4(c);
    }
    case DomainType.AAAA: {
      return validateIpv6(c);
    }
    default: {
      // CNAME
      return validateDomain(c);
    }
  }
}

export function Form({ domain }: { domain: Domains }) {
  const [content, setContent] = useState(domain.content);
  const [type, setType] = useState(domain.type);
  const [proxied, setProxied] = useState(domain.proxied ?? true);

  return (
    <>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>类型</span>
        </label>
        <select
          name='type'
          defaultValue={type}
          className='select select-bordered w-full max-w-xs'
          onChange={(e) => setType(e.target.value)}>
          <option value={DomainType.CNAME}>CNAME</option>
          <option value={DomainType.A}>A: IPv4</option>
          <option value={DomainType.AAAA}>AAAA: IPv6</option>
        </select>
      </div>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>内容</span>
        </label>
        <input
          type='text'
          name='content'
          placeholder={getPlaceHolder(type)}
          defaultValue={content}
          onChange={(e) => setContent(e.target.value.trim())}
          className={clsx('input', {
            'input-error': !validateContent(type, content),
            'input-bordered': !validateContent(type, content)
          })}
        />
        {!validateContent(type, content) && (
          <label className='label'>
            <span className='label-text-alt'>输入内容的格式不正确</span>
          </label>
        )}
      </div>
      <div className='form-control'>
        <label className='cursor-pointer label'>
          <span className='label-text'>CDN Proxy</span>
          <input
            type='checkbox'
            name='proxied'
            checked={proxied}
            className='toggle toggle-secondary'
            onChange={setProxied.bind(this, !proxied)}
          />
        </label>
      </div>

      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>
            注意： 添加域名绑定时使用 Punycode 域名
          </span>
        </label>
        <div className='mockup-code text-sm'>
          <pre>
            <code>{toASCII(`${domain.name}.憨憨.我爱你`)}</code>
          </pre>
        </div>
      </div>
    </>
  );
}
