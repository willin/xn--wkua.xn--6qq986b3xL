import { withIronSessionSsr } from 'iron-session/next';
import Link from 'next/link';

import { Layout } from '../../components/layout';
import { sessionOptions } from '../../lib/session';
import { prisma } from '../../lib/prisma';
import { User } from '../api/me';

export default function Index({
  user,
  total
}: {
  user: {
    id: string;
    username: string;
    avatar: string;
    website: string;
  };
  total: {
    domains: number;
    emails: number;
  };
}) {
  return (
    <Layout>
      <main className='text-center'>
        <h1 className='font text-2xl text-yellow-700'>憨憨.我爱你</h1>
        <hr className='divider' />
        <div className='border stats shadow'>
          <div className='stat'>
            <div className='stat-figure text-info'>
              <div className='avatar '>
                <div className='w-16 h-16 p-1 mask mask-squircle bg-base-100'>
                  <img src={user.avatar} className='mask mask-squircle' />
                </div>
              </div>
            </div>
            <div className='stat-title'>
              <br />
              {user.username}
            </div>
            <div className='stat-desc'>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href='/api/logout'>登出</a>
            </div>
          </div>

          <Link href='/dashboard/domain' passHref>
            <a>
              <div className='stat'>
                <div className='stat-figure text-primary'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    className='inline-block w-8 h-8 stroke-current'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M13 10V3L4 14h7v7l9-11h-7z'></path>
                  </svg>
                </div>
                <div className='stat-title'>提供域名</div>
                <div className='stat-value text-info'>{total.domains}</div>
                <div className='stat-desc'>点击进入</div>
              </div>
            </a>
          </Link>
          <div className='stat'>
            <div className='stat-figure text-secondary'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block w-8 h-8 stroke-current'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
              </svg>
            </div>
            <div className='stat-title'>提供邮箱</div>
            <div className='stat-value text-info'>{total.emails}</div>
            <div className='stat-desc'>暂未开始</div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res
}) {
  const user = req.session.user as User;

  if (!user) {
    res.setHeader('location', '/api/login');
    res.statusCode = 302;
    res.end();
    return {
      redirect: {
        destination: '/api/login',
        permanent: false
      }
    };
  }

  const [[{ no: domains = 0 } = {}], [{ no: emails = 0 } = {}]] =
    await Promise.all([
      prisma.domains.findMany({
        take: 1,
        select: {
          no: true
        },
        orderBy: {
          no: 'desc'
        }
      }),
      prisma.emails.findMany({
        take: 1,
        select: {
          no: true
        },
        orderBy: {
          no: 'desc'
        }
      })
    ]);

  const userInfo = {
    id: user.sub,
    username: user.nickname || user.name || user.username,
    avatar: user.picture,
    website: user.profile
  };

  return {
    props: { user: userInfo, total: { domains, emails } }
  };
},
sessionOptions);
