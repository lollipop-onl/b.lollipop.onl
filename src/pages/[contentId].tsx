import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout } from '~/components/templates/Layout';
import * as C from '~/const';
import { fetchAllPostList, fetchPostContent } from '~/api';
import { BlogPost, GyazoOEmbed } from '~/api/types';
import { url } from '~/utils';
import { fetchGyazoImageInfo } from '~/api/gyazo';

type Props = {
  /** ブログポストコンテンツ */
  content: BlogPost;
  /** １つ前のブログポスト */
  previousBlogPost?: BlogPost;
  /** １つ後のブログポスト */
  nextBlogPost?: BlogPost;
  /** アイキャッチ画像情報 */
  eyecatchImage?: GyazoOEmbed;
};

export const config = { amp: true };

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const contentId = Array.isArray(params.contentId) ? params.contentId[0] : params.contentId;
  const blogContent = await fetchPostContent(contentId);
  const allBlogContentList = await fetchAllPostList({ fields: 'id,title' });
  const currentPostIndex = allBlogContentList.findIndex((content) => content.id === contentId);
  const previousBlogPost = allBlogContentList[currentPostIndex - 1];
  const nextBlogPost = allBlogContentList[currentPostIndex + 1];
  const props: Props = { content: blogContent };

  if (previousBlogPost) {
    props.previousBlogPost = previousBlogPost;
  }

  if (nextBlogPost) {
    props.nextBlogPost = nextBlogPost;
  }

  if (blogContent.eyecatchUrl) {
    props.eyecatchImage = await fetchGyazoImageInfo(blogContent.eyecatchUrl);
  }

  return { props };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allBlogContentList = await fetchAllPostList({ fields: 'id' });

  return ({
    paths: allBlogContentList.map(({ id }) => url(C.PAGES.BLOG_POST, { contentId: id })),
    fallback: false,
  });
};

export const PostContentPage: FC<Props> = ({ content, eyecatchImage }) => (
  <Layout
    title={content.title}
    description={content.content}
    ogType="article"
    ogImage={content.eyecatchUrl}
  >
    <amp-img
      src={eyecatchImage.url}
      width={eyecatchImage.width}
      height={eyecatchImage.height}
    />
    <h1>{content.title}</h1>
  </Layout>
);

export default PostContentPage;
