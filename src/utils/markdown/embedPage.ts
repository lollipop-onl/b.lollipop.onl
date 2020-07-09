import { PluginSimple } from 'markdown-it/lib';
import ParserBlock from 'markdown-it/lib/parser_block';
import { RenderRule } from 'markdown-it/lib/renderer';
import { EmbedPageInfo } from '~/api/types';
import { optimizeHtmlString } from '~/utils';

const pickEmbedPageUrl = (content: string): string[] => content
  .split('\n')
  .map((line) => {
    const matches = /^embed:\s*(https?:\/\/.+)/.exec(line);

    return matches?.[1];
  })
  .filter((line): line is NonNullable<typeof line> => !!line);

const embedPageRuler: ParserBlock.RuleBlock = (state, startLine, endLine, silent) => {
  const pos = state.bMarks[startLine] + state.tShift[startLine];
  const posMax = state.eMarks[startLine];
  const line = state.src.slice(pos, posMax);
  const matches = /^embed:\s*(https?:\/\/.+)/.exec(line);

  if (!matches || pos >= posMax) {
    return false;
  }

  const targetUrl = matches[1];

  if (!silent) {
    state.line = startLine + 1;

    const token = state.push('embedPage', '', 0);

    token.content = targetUrl;
  }

  return true;
};

const pageEmbedTokenizer: RenderRule = (
  tokens,
  index,
  options,
  env: { embedPageInfo: EmbedPageInfo[] },
) => {
  const { content: targetUrl } = tokens[index];
  const embedPageInfo = env.embedPageInfo.find(({ url }) => url === targetUrl);

  if (!embedPageInfo) {
    return `<p>Fallback... ${targetUrl}</p>`;
  }

  const {
    title, siteName, description, imageUrl,
  } = embedPageInfo;

  return optimizeHtmlString(`
    <p>
      <a
        class="embedPage"
        href="${targetUrl}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="thumbnail">
          ${!imageUrl ? '' : `
            <amp-img
              class="image"
              src="${imageUrl}"
              width="100"
              height="100"
              layout="fill"
            />
          `}
        </span>
        <span class="sitename">${siteName || ''}</span>
        <span class="title">${title || ''}</span>
        ${`<span class="description">${description}</span>` || ''}
      </a>
    </p>
  `);
};

const embedPagePlugin: PluginSimple = (md) => {
  md.renderer.rules.embedPage = pageEmbedTokenizer;
  md.block.ruler.before('paragraph', 'embedPage', embedPageRuler);
};

export { embedPagePlugin as embedPage, pickEmbedPageUrl };
