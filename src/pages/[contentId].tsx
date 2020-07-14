import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import urlJoin from 'url-join';
import { Layout } from '~/components/templates/Layout';
import { PostSection } from '~/components/organisms/PostSection';
import { PostSidebar } from '~/components/organisms/PostSidebar';
import * as C from '~/const';
import {
  fetchAllPostList, fetchPostContent, fetchGyazoImageInfo,
} from '~/api';
import { BlogPost, GyazoOEmbed } from '~/api/types';
import { url, markdown, param } from '~/utils';
import { fetchAmpUrl } from '~/api/google';

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
  /** AMPにキャッシュされたURL */
  ampUrl?: string;
};

export const config = { amp: true };

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const contentId = param(params, 'contentId');
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
    const [thumbnailImage] = await fetchGyazoImageInfo(blogPost.thumbnailUrl);

    if (thumbnailImage) {
      props.thumbnailImage = thumbnailImage;
    }
  }

  const ampUrl = await fetchAmpUrl(url(C.PAGES.BLOG_POST, { contentId }));

  if (ampUrl) {
    props.ampUrl = ampUrl;
  }

  return { props };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allBlogContentList = await fetchAllPostList({ fields: 'id' });

  return {
    paths: allBlogContentList.map(({ id }) => url(C.PAGES.BLOG_POST, { contentId: id })),
    fallback: false,
  };
};

export const PostContentPage: FC<Props> = ({
  post,
  contentHtml,
  thumbnailImage,
  ampUrl,
}) => (
  <Layout
    title={post.title}
    description={post.content}
    ogType="article"
    ogImage={post.thumbnailUrl || urlJoin('https://b.lollipop.onl', url(C.PAGES.BLOG_POST, { contentId: post.id }), 'ogp.png')}
    sidebar={<PostSidebar post={post} ampUrl={ampUrl} />}
  >
    <PostSection
      post={post}
      thumbnailImage={thumbnailImage}
      contentHtml={contentHtml}
    />
  </Layout>
);

export default PostContentPage;
