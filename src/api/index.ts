import { fetchMicroCMSData } from './microCMS';
import { FetchListQuery, FetchContentQuery } from './types';

/**
 * ブログポストのリストを取得する
 * @param query クエリパラメータ
 */
export const fetchPostList = async (query: FetchListQuery): Promise<any> => fetchMicroCMSData('/v1/posts', query);
