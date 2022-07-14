export function Home() {
  return (
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
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href='https://github.com/willin/xn--wkua.xn--6qq986b3xL/issues'>开始申请 ❤ Start Apply</a>
      </div>
    </main>
  );
}
