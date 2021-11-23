import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>憨憨.我爱你</title>
        <meta name='description' content='Free Romantic Domain and EMail' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' sizes='57x57' href='/images/apple-icon-57x57.png' />
        <link rel='apple-touch-icon' sizes='60x60' href='/images/apple-icon-60x60.png' />
        <link rel='apple-touch-icon' sizes='72x72' href='/images/apple-icon-72x72.png' />
        <link rel='apple-touch-icon' sizes='76x76' href='/images/apple-icon-76x76.png' />
        <link rel='apple-touch-icon' sizes='114x114' href='/images/apple-icon-114x114.png' />
        <link rel='apple-touch-icon' sizes='120x120' href='/images/apple-icon-120x120.png' />
        <link rel='apple-touch-icon' sizes='144x144' href='/images/apple-icon-144x144.png' />
        <link rel='apple-touch-icon' sizes='152x152' href='/images/apple-icon-152x152.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-icon-180x180.png' />
        <link rel='icon' type='image/png' sizes='192x192' href='/images/android-icon-192x192.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/images/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='96x96' href='/images/favicon-96x96.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/images/favicon-16x16.png' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
        <meta name='theme-color' content='#ffffff' />
      </Head>

      <main>
        <div className='sign'>
          <div className='neon-blue' id='logo'>
            憨憨.我<span id='fade'>爱</span>你
          </div>
          <div className='neon-blue'>
            提供浪漫的{' '}
            <span className='neon-purple' id='trav'>
              域名
            </span>{' '}
            和 <span className='neon-purple'>邮箱</span>
          </div>
        </div>
        <div className='text-center pt-10'>
          <a href='https://github.com/willin/xn--wkua.xn--6qq986b3xL/discussions/1' target='_blank' rel='noreferrer'>
            开始申请 ❤ Start Apply
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
