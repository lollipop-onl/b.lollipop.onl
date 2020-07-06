import urlJoin from 'url-join';

/**
 * ページのURLを取得する
 * @param path パス
 * @param baseUrl ベースのURL
 */
export const usePageUrl = (path: string, baseUrl = 'https://b.lollipop.onl'): string => urlJoin(baseUrl, path);
