import markdownIt from 'markdown-it';
import { gyazo, pickGyazoUrl } from './gyazo';
import { highlight } from './highlight';
import { youtube } from './youtube';
import { fetchGyazoImageInfo } from '~/api/gyazo';

const md = markdownIt({
  breaks: true,
});

md.use(gyazo);
md.use(youtube);

// シンタクスハイライトのプラグインを登録する
md.use(highlight);

/**
 * MarkdownをHTMLにパースする
 * @param source
 */
const markdown = async (source: string): Promise<string> => {
  const gyazoUrlList = pickGyazoUrl(source);
  const gyazoImageInfo = await Promise.all(gyazoUrlList.map((url) => fetchGyazoImageInfo(url)));

  return md.render(source, { gyazoImageInfo });
};

export { markdown };
