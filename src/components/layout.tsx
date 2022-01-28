import type { ReactNode } from 'react';
import Head from 'next/head';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>憨憨.我爱你</title>
        <meta name='description' content='Free Romantic Domain and EMail' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='57x57'
          href='/images/apple-icon-57x57.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='60x60'
          href='/images/apple-icon-60x60.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='72x72'
          href='/images/apple-icon-72x72.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='76x76'
          href='/images/apple-icon-76x76.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='114x114'
          href='/images/apple-icon-114x114.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='120x120'
          href='/images/apple-icon-120x120.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='144x144'
          href='/images/apple-icon-144x144.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='152x152'
          href='/images/apple-icon-152x152.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/images/apple-icon-180x180.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/images/android-icon-192x192.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/images/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='96x96'
          href='/images/favicon-96x96.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/images/favicon-16x16.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      {children}
      <footer className='text-center pt-10 text-sm'>
        <a
          href='https://willin.wang'
          target='_blank'
          rel='noreferrer'
          className='text-primary'>
          Willin Wang
        </a>{' '}
        用{' '}
        <a href='https://afdian.net/@willin' target='_blank' rel='noreferrer'>
          ❤️ 发电
        </a>
        ， 本项目开源在{' '}
        <a
          href='https://github.com/willin/xn--wkua.xn--6qq986b3xL'
          target='_blank'
          rel='noreferrer'
          className='text-secondary'>
          Github
        </a>
      </footer>
    </>
  );
}
