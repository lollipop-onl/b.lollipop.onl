import { ParsedUrlQuery } from 'querystring';

/**
 * パラメータの値を取得する
 * @param params パラメータ
 * @param key パラメータのキー
 */
export const param = (params: ParsedUrlQuery | undefined, key: string): string | undefined => {
  if (!params) {
    return;
  }

  const { [key]: value } = params;

  return Array.isArray(value) ? value[0] : value;
};
