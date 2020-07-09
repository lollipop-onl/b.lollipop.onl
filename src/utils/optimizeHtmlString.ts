/**
 * HTMLの文字列からスペースと改行を削除する
 * @param source ソースコード
 */
export const optimizeHtmlString = (source: string): string => {
  return source.replace(/\s*?\n\s*?/g, '');
};
