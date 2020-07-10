/**
 * HTMLの文字列からスペースと改行を削除する
 * @param source ソースコード
 */
export const optimizeHtmlString = (source: string): string => source.replace(/\s*?\n\s*?/g, '');
