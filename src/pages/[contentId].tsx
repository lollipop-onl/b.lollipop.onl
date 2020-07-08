import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout } from '~/components/templates/Layout';
import { PostContent } from '~/components/atoms/PostContent';
import * as C from '~/const';
import { fetchAllPostList, fetchPostContent } from '~/api';
import { BlogPost, GyazoOEmbed } from '~/api/types';
import { url, markdown } from '~/utils';
import { fetchGyazoImageInfo } from '~/api/gyazo';

type Props = {
  /** ブログポスト */
  post: BlogPost;
  /** ブログポストコンテンツ */
  contentHtml: string;
  /** １つ前のブログポスト */
  previousBlogPost?: BlogPost;
  /** １つ後のブログポスト */
  nextBlogPost?: BlogPost;
  /** アイキャッチ画像情報 */
  thumbnailImage?: GyazoOEmbed;
};

export const config = { amp: true };

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const contentId = Array.isArray(params?.contentId) ? params?.contentId[0] : params?.contentId;
  const blogPost = await fetchPostContent(contentId || '');
  const allBlogContentList = await fetchAllPostList({ fields: 'id,title' });
  const currentPostIndex = allBlogContentList.findIndex((content) => content.id === contentId);
  const previousBlogPost = allBlogContentList[currentPostIndex - 1];
  const nextBlogPost = allBlogContentList[currentPostIndex + 1];
  const contentHtml = await markdown(blogPost.content);
  const props: Props = { post: blogPost, contentHtml };

  if (previousBlogPost) {
    props.previousBlogPost = previousBlogPost;
  }

  if (nextBlogPost) {
    props.nextBlogPost = nextBlogPost;
  }

  if (blogPost.thumbnailUrl) {
    props.thumbnailImage = await fetchGyazoImageInfo(blogPost.thumbnailUrl);
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

export const PostContentPage: FC<Props> = ({ post, contentHtml, thumbnailImage }) => (
  <Layout
    title={post.title}
    description={post.content}
    ogType="article"
    ogImage={post.thumbnailUrl}
  >
    { thumbnailImage ? (
      <amp-img
        src={thumbnailImage.url}
        width={thumbnailImage.width}
        height={thumbnailImage.height}
      />
    ) : null }
    <h1>{post.title}</h1>
    <section>
      <PostContent html={contentHtml} />
    </section>

  </Layout>
);

export default PostContentPage;
