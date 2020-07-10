import * as C from '~/const';
import { url } from '~/utils/url';

/**
 * ページネーションする
 * @param count IDごとのカウント
 * @param baseUrl ベースURL
 * @param idKey IDとして使用するキー
 * @param perPage １ページのポスト数
 */
export const getPaginationPaths = (
  count: Record<string, number>,
  baseUrl: string,
  idKey = '',
  perPage = C.POST_PER_PAGE,
): string[] => Object
  .entries(count)
  .flatMap(([id, totalCount]) => {
    const totalPages = Math.ceil(totalCount / perPage);
    const paths: string[] = [];

    for (let i = 0; i < totalPages; i += 1) {
      paths.push(url(baseUrl, { [idKey]: id, page: i + 1 }));
    }

    return paths;
  });
