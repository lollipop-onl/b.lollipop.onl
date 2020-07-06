/**
 * ページのタイトルを取得する
 * @param title タイトル
 * @param siteTitle サイトタイトル
 */
export const usePageTitle = (title?: string, siteTitle = 'b.lollipop.onl'): string => (title ? `${title} - ${siteTitle}` : siteTitle);
