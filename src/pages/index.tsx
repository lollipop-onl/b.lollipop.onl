import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Layout } from '~/components/templates/Layout';
import * as C from '~/const';
import { fetchPostList } from '~/api';
import { url } from '~/utils';

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
    <ol>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={url(C.PAGES.BLOG_POST, { contentId: post.id })}>
            <a>
              {post.title}
            </a>
          </Link>
        </li>
      ))}
    </ol>
    <pre>{JSON.stringify(posts, null, '  ')}</pre>
  </Layout>
);

export default IndexPage;
