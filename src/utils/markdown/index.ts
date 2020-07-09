import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import { embedPage, pickEmbedPageUrl } from './embedPage';
import { gyazo, pickGyazoUrl } from './gyazo';
import { highlight } from './highlight';
import { youtube } from './youtube';
import { fetchGyazoImageInfo } from '~/api/gyazo';
import { fetchEmbedPageInfo } from '~/api/embedPage';

const md = markdownIt({
  breaks: true,
});

md.use(markdownItAnchor, { permalink: true });
md.use(embedPage);
md.use(gyazo);
md.use(youtube);

// シンタクスハイライトのプラグインを登録する
md.use(highlight);

/**
 * MarkdownをHTMLにパースする
 * @param source
 */
const markdown = async (source: string): Promise<string> => {
  const [
    gyazoImageInfo,
    embedPageInfo,
  ] = await Promise.all([
    fetchGyazoImageInfo(pickGyazoUrl(source)),
    fetchEmbedPageInfo(pickEmbedPageUrl(source)),
  ]);

  return md.render(source, { gyazoImageInfo, embedPageInfo });
};

export { markdown };
export * from './slugify';
