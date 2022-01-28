import { withIronSessionSsr } from 'iron-session/next';
import { InferGetServerSidePropsType } from 'next';

import { Layout } from '../../components/layout';
import { sessionOptions } from '../../lib/session';

export default function Index({
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
    </Layout>
  );
}

export const getServerSideProps = withIronSessionSsr(function ({ req, res }) {
  const user = req.session.user;

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

  return {
    props: { user: req.session.user }
  };
}, sessionOptions);
