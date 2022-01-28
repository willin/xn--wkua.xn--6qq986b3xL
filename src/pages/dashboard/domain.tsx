import { withIronSessionSsr } from 'iron-session/next';
import Link from 'next/link';

import { Layout } from '../../components/layout';
import { sessionOptions } from '../../lib/session';
import { prisma } from '../../lib/prisma';
import { User } from '../api/me';
import { CreateDomain } from '../../components/domain/create';
import { Domains, Status } from '@prisma/client';
import { EditDomain } from '../../components/domain/edit';

export default function Index({ domain }: { domain: Domains }) {
  return (
    <Layout>
      <main className='text-center'>
        <h1 className='font text-2xl text-yellow-700'>憨憨.我爱你</h1>
        <hr className='divider' />
        {domain.id && <EditDomain domain={domain} />}
        {!domain.id && <CreateDomain />}
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

  const userInfo = {
    id: user.sub,
    username: user.nickname || user.name || user.username,
    avatar: user.picture,
    website: user.profile
  };

  const [domain] = await prisma.domains.findMany({
    select: {
      id: true,
      no: true,
      name: true,
      punycode: true,
      type: true,
      content: true,
      proxied: true,
      user: true,
      status: true,
      createdAt: true,
      updatedAt: true
    },
    take: 1,
    where: {
      user: userInfo.id,
      status: {
        in: [Status.ACTIVE, Status.PENDING]
      }
    }
  });

  if (typeof domain === 'object') {
    Object.assign(domain, {
      // eslint-disable-next-line
      createdAt: domain.createdAt.toISOString(),
      // eslint-disable-next-line
      updatedAt: domain.updatedAt.toISOString()
    });
  }
  return {
    props: {
      user: userInfo,
      domain: {
        ...(domain ? domain : {})
      }
    }
  };
},
sessionOptions);
