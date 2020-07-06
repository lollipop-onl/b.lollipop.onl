import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout } from '~/components/templates/Layout';
import * as C from '~/const';
import { fetchAllPostIdList, fetchPostContent } from '~/api';
import { BlogPost } from '~/api/types';
import { url } from '~/utils';

type Props = {
  content: BlogPost;
};

export const config = { amp: true };

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const contentId = Array.isArray(params.contentId) ? params.contentId[0] : params.contentId;
  const results = await fetchPostContent(contentId);

  return {
    props: {
      content: results,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogPostIdList = await fetchAllPostIdList({ fields: 'id' });

  return ({
    paths: blogPostIdList.map(({ id }) => url(C.PAGES.BLOG_POST, { contentId: id })),
    fallback: false,
  });
};

export const PostContentPage: FC<Props> = ({ content }) => (
  <Layout title={content.title} description={content.content}>
    <h1>{content.title}</h1>
    <pre>{JSON.stringify(content, null, '  ')}</pre>
  </Layout>
);

export default PostContentPage;
