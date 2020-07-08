import ky from 'ky-universal';
import urlJoin from 'url-join';
import { FetchContentQuery, FetchListQuery } from '~/api/types';

const microCMS_SERVICE_ID = 'lollipop';
const microCMS_BASE_URL = `https://${microCMS_SERVICE_ID}.microcms.io`;

/**
 * microCMSからデータを取得する
 * @param path リクエストパス
 * @param query リクエストクエリ
 */
export const fetchMicroCMSData = async <T extends unknown>(
  path: string,
  query?: FetchListQuery | FetchContentQuery,
): Promise<T> => ky.get(urlJoin(microCMS_BASE_URL, path), {
  searchParams: query as Record<string, string>,
  headers: {
    'X-API-KEY': process.env.microCMS_API_KEY || '',
  },
}).json<T>();
