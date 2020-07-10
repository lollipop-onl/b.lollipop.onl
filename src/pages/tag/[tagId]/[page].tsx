import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '~/components/templates/Layout';
import * as C from '~/const';
import { fetchAllPostList, fetchPostList, fetchPostTag } from '~/api';
import { BlogPost, Tag } from '~/api/types';
import { getPaginationPaths, param, url } from '~/utils';

type Props = {
  /** タグ */
  tag: Tag;
  /** ブログポストのリスト */
  posts: BlogPost[];
  /** すべてのポスト数 */
  totalPostCount: number;
};

export const config = { amp: true };

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const tagId = param(params, 'tagId');
  const page = Number(param(params, 'page')) - 1;

  const [
    { contents },
    tag,
    allPostList,
  ] = await Promise.all([
    fetchPostList({
      offset: C.POST_PER_PAGE * page,
      limit: C.POST_PER_PAGE,
      filters: `tags[contains]${tagId}`,
    }),
    fetchPostTag(tagId || ''),
    fetchAllPostList({
      fields: 'id',
      filters: `tags[contains]${tagId}`,
    }),
  ]);

  return {
    props: {
      posts: contents,
      tag,
      totalPostCount: allPostList.length,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allBlogContentList = await fetchAllPostList({ fields: 'tags.id' });
  const tagPostCount = allBlogContentList.reduce<Record<string, number>>((count, post) => {
    post.tags.forEach(({ id }) => {
      count[id] = (count[id] || 0) + 1;
    });

    return count;
  }, {});

  return {
    paths: getPaginationPaths(tagPostCount, C.PAGES.BLOG_TAG, 'tagId'),
    fallback: false,
  };
};

const TagPage: FC<Props> = ({ tag, posts, totalPostCount }) => {
  const { query } = useRouter();
  const page = param(query, 'page');
  const title = `タグ：${tag.name}${page === '1' ? '' : ` - ${page}ページ`}`;

  return (
    <Layout title={title}>
      <h1>Tag: {tag.name} - {totalPostCount} posts</h1>
      <ol>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={url(C.PAGES.BLOG_POST, { contentId: post.id })}>{post.title}</a>
          </li>
        ))}
      </ol>
    </Layout>
  );
};

export default TagPage;
