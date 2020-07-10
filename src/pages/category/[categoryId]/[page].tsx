import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout } from '~/components/templates/Layout';
import * as C from '~/const';
import { fetchAllPostList, fetchPostList } from '~/api';
import { BlogPost } from '~/api/types';
import { param, url } from '~/utils';

type Props = {
  /** ブログポストのリスト */
  posts: BlogPost[];
};

export const config = { amp: true };

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const categoryId = param(params, 'categoryId');
  const page = Number(param(params, 'page')) - 1;

  const { contents } = await fetchPostList({
    offset: C.POST_PER_PAGE * page,
    limit: C.POST_PER_PAGE,
    filters: `category[equals]${categoryId}`,
  });

  return {
    props: {
      posts: contents,
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
    paths: Object.entries(categoryPostCount).flatMap(([categoryId, totalCount]) => {
      const paths: string[] = [];

      for (let i = 0; i < Math.ceil(totalCount / C.POST_PER_PAGE); i += 1) {
        paths.push(url(C.PAGES.BLOG_CATEGORY, { categoryId, page: i + 1 }));
      }

      return paths;
    }),
    fallback: false,
  };
};

const CategoryPage: FC<Props> = ({ posts }) => (
  <Layout>
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
