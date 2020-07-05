import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import ky from 'ky-universal';
import { Layout } from '~/components/templates/Layout';
import { fetchPostList } from '~/api';

type Props = {
  posts: any[];
};

export const config = { amp: true };

export const getStaticProps: GetStaticProps<Props> = async () => {
  const results = await fetchPostList();

  return {
    props: {
      posts: results.contents,
    },
  };
};

export const IndexPage: FC<Props> = ({ posts = [] }) => (
  <Layout title="b.lollipop.onl">
    <pre>{JSON.stringify(posts, null, '  ')}</pre>
  </Layout>
);

export default IndexPage;
