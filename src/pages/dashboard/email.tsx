import { Emails, Status } from '@prisma/client';
import { withIronSessionSsr } from 'iron-session/next';
import Link from 'next/link';
import { Layout } from '../../components/layout';
import { sessionOptions } from '../../lib/session';
import { prisma } from '../../lib/prisma';
import { User } from '../api/me';
import { CreateEmail } from '../../components/email/create';
import { ShowEmails } from '../../components/email/list';

export default function Index({ emails }: { emails: Emails[] }) {
  return (
    <Layout>
      <main className='text-center'>
        <h1 className='font text-2xl text-yellow-700'>憨憨.我爱你</h1>
        <hr className='divider' />
        <div className='alert alert-warning'>
          <div className='text-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='w-6 h-6 mx-2 stroke-current'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'></path>
            </svg>
            <label>
              由于目前服务商 Cloudflare 尚不支持 IDN
              域名，所以当前只能预申请抢注。请关注后续动态。
            </label>
          </div>
        </div>

        <hr className='divider' />
        {emails.length > 0 && <ShowEmails emails={emails} />}
        {emails.length < 2 && <CreateEmail />}
        <hr className='divider' />
        <Link href='/dashboard'>
          <a>返回</a>
        </Link>
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

  const emails = await prisma.emails.findMany({
    select: {
      id: true,
      no: true,
      name: true,
      punycode: true,
      content: true,
      user: true,
      status: true,
      createdAt: true,
      updatedAt: true
    },
    take: 2,
    where: {
      user: user.sub,
      status: {
        in: [Status.ACTIVE, Status.PENDING]
      }
    }
  });

  emails.forEach((email) => {
    Object.assign(email, {
      // eslint-disable-next-line
      createdAt: email.createdAt.toISOString(),
      // eslint-disable-next-line
      updatedAt: email.updatedAt.toISOString()
    });
  });

  return {
    props: { emails }
  };
},
sessionOptions);
