import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '~/components/templates/Layout';
import * as C from '~/const';
import { fetchAllPostList, fetchPostCategory, fetchPostList } from '~/api';
import { BlogPost, Category } from '~/api/types';
import { getPaginationPaths, param, url } from '~/utils';

type Props = {
  /** ブログカテゴリ */
  category: Category;
  /** ブログポストのリスト */
  posts: BlogPost[];
  /** すべてのポスト数 */
  totalPostCount: number;
};

export const config = { amp: true };

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const categoryId = param(params, 'categoryId');
  const page = Number(param(params, 'page')) - 1;

  const [
    { contents },
    category,
    allPostList,
  ] = await Promise.all([
    fetchPostList({
      offset: C.POST_PER_PAGE * page,
      limit: C.POST_PER_PAGE,
      filters: `category[equals]${categoryId}`,
    }),
    fetchPostCategory(categoryId || ''),
    fetchAllPostList({
      fields: 'id',
      filters: `category[equals]${categoryId}`,
    }),
  ]);

  return {
    props: {
      posts: contents,
      category,
      totalPostCount: allPostList.length,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allBlogContentList = await fetchAllPostList({ fields: 'category.id' });
  const categoryPostCount = allBlogContentList.reduce<Record<string, number>>((count, post) => {
    const { id } = post.category;

    count[id] = (count[id] || 0) + 1;

    return count;
  }, {});

  return {
    paths: getPaginationPaths(categoryPostCount, C.PAGES.BLOG_CATEGORY, 'categoryId'),
    fallback: false,
  };
};

const CategoryPage: FC<Props> = ({ category, posts, totalPostCount }) => (
  <Layout>
    <h1>Category: {category.name} - {totalPostCount} posts</h1>
    <ol>
      {posts.map((post) => (
        <li key={post.id}>
          <a href={url(C.PAGES.BLOG_POST, { contentId: post.id })}>{post.title}</a>
        </li>
      ))}
    </ol>
  </Layout>
);

export default CategoryPage;
