import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import ky from 'ky-universal';
import { Layout } from '~/components/templates/Layout';

type Props = {
  posts: any[];
};

export const config = { amp: true };

export const getStaticProps: GetStaticProps<Props> = async () => {
  const results: any = await ky.get('https://lollipop.microcms.io/api/v1/posts', {
    headers: {
      'X-API-KEY': process.env.microCMS_API_KEY,
    },
  }).json();

  return {
    props: {
      posts: results.contents,
    },
  };
};

export const IndexPage: FC<Props> = ({ posts = [] }) => (
  <Layout title="b.lollipop.onl">
  </Layout>
);

export default IndexPage;
