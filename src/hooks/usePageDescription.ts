import removeMarkdown from 'remove-markdown';

/**
 * ページの説明文を取得する
 * @param description 説明文
 * @param maxTextLength 最大文字長
 */
export const usePageDescription = (
  description?: string,
  maxTextLength = 100,
): string => {
  const plainText = removeMarkdown(description);

  return plainText.slice(0, maxTextLength);
};
