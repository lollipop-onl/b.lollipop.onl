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
