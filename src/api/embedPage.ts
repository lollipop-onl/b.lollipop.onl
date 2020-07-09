import { JSDOM } from 'jsdom';
import ky from 'ky-universal';
import { EmbedPageInfo } from '~/api/types';

export const fetchEmbedPageInfo = async (url: string | string[]): Promise<EmbedPageInfo[]> => {
  const targetUrls = Array.isArray(url) ? url : [url];
  const results = await Promise.allSettled(targetUrls.map(async (targetUrl) => {
    const response = await ky.get(targetUrl);

    return response.text();
  }));

  return results
    .filter((result): result is Exclude<typeof result, PromiseRejectedResult> => result.status === 'fulfilled')
    .map(({ value: html }, i) => {
      const targetUrl = targetUrls[i];
      const { window } = new JSDOM(html, {});

      // タイトルを取得
      const $ogTitle = window.document.querySelector('meta[property="og:title"]');
      const $title = window.document.querySelector('title');
      let title = 'fallback title text';

      if ($ogTitle) {
        title = $ogTitle.getAttribute('content') || title;
      } else if ($title) {
        title = $title.textContent || title;
      }

      // ベースの情報オブジェクト
      const info: EmbedPageInfo = {
        url: targetUrl,
        title,
      };

      // サイト名
      const $siteName = window.document.querySelector('meta[property="og:site_name"]')
        || window.document.querySelector('meta[property="twitter:site"]');

      if ($siteName) {
        info.siteName = $siteName.getAttribute('content') || '';
      }

      // 説明
      const $description = window.document.querySelector('meta[property="og:description"]')
        || window.document.querySelector('meta[property="twitter:description"]')
        || window.document.querySelector('meta[name=description]');

      if ($description) {
        info.description = $description.getAttribute('content') || '';
      }

      // 画像URL
      const $image = window.document.querySelector('meta[property="og:image"]')
        || window.document.querySelector('meta[property="twitter:image"]');

      if ($image) {
        info.imageUrl = $image.getAttribute('content') || '';
      }

      return info;
    });
};
