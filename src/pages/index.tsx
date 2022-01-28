import type { NextPage } from 'next';
import { Layout } from '../components/layout';
import { Home } from '../components/home';

const Index: NextPage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default Index;
