/**
 * タイトルをスラッグに変換する
 * @see https://github.com/valeriangalliat/markdown-it-anchor/blob/master/index.js#L1
 * @param input
 */
export const slugify = (input: string) => encodeURIComponent(
  input
    .trim()
    .toLowerCase()
    .replace(/^#+\s*/, '')
    .replace(/\s+/g, '-'),
);
