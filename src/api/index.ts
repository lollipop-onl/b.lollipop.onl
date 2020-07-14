import { fetchMicroCMSData } from './microCMS';
import {
  FetchListQuery, BlogPostList, FetchContentQuery, BlogPost, Tag, Category,
} from './types';
import { url } from '~/utils';

/**
 * ブログポストのリストを取得する
 * @param query クエリパラメータ
 */
export const fetchPostList = async (query?: FetchListQuery): Promise<BlogPostList> => fetchMicroCMSData<BlogPostList>('/api/v1/posts', query);

export const fetchAllPostList = async (query?: Omit<FetchListQuery, 'offset' | 'limit'>): Promise<BlogPost[]> => {
  let contentList: BlogPost[] = [];
  const page = 0;

  for (;;) {
    // eslint-disable-next-line no-await-in-loop
    const { contents } = await fetchPostList({
      ...query,
      offset: page * 100,
      limit: 100,
    });

    contentList = contentList.concat(contents);

    if (contents.length !== 100) {
      break;
    }
  }

  return contentList;
};

/**
 * ブログポストを取得する
 * @param contentId コンテンツID
 * @param query クエリパラメータ
 */
export const fetchPostContent = async (
  contentId: string,
  query?: FetchContentQuery,
): Promise<BlogPost> => fetchMicroCMSData<BlogPost>(
  url('/api/v1/posts/:contentId', { contentId }),
  query,
);

/**
 * ブログカテゴリを取得する
 * @param contentId コンテンツID
 */
export const fetchPostCategory = async (
  contentId: string,
): Promise<Category> => fetchMicroCMSData<Category>(
  url('/api/v1/categories/:contentId', { contentId }),
);

/**
 * ブログタグを取得する
 * @param contentId コンテンツID
 */
export const fetchPostTag = async (contentId: string): Promise<Tag> => fetchMicroCMSData<Tag>(
  url('/api/v1/tags/:contentId', { contentId }),
);

export * from './embedPage';
export * from './google';
export * from './gyazo';
