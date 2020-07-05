import { fetchMicroCMSData } from './microCMS';
import {
  FetchListQuery, BlogPostList, FetchContentQuery, BlogPost,
} from './types';
import { url } from '~/utils';

/**
 * ブログポストのリストを取得する
 * @param query クエリパラメータ
 */
export const fetchPostList = async (query?: FetchListQuery): Promise<BlogPostList> => fetchMicroCMSData<BlogPostList>('/api/v1/posts', query);

/**
 * ブログポストを取得する
 * @param contentId コンテンツID
 * @param query クエリパラメータ
 */
export const fetchPostContent = async (
  contentId: string,
  query?: FetchContentQuery,
): Promise<BlogPost> => fetchMicroCMSData<BlogPost>(
  url('/v1/v1/posts/:contentId', { contentId }),
  query,
);
