import MarkdownIt, { PluginSimple } from 'markdown-it';
import { RenderRule } from 'markdown-it/lib/renderer';
import ParserBlock from 'markdown-it/lib/parser_block';
import urlJoin from 'url-join';
import { GyazoOEmbed } from '~/api/types';

const pickGyazoUrl = (content: string): string[] => content
  .split('\n')
  .map((line) => {
    const matches = /^(?:https?:)?\/\/(?:i\.)?gyazo\.com\/([a-z0-9]+)(?:\.[a-z0-9])?/.exec(line);

    return matches?.[1];
  })
  .filter((line): line is NonNullable<typeof line> => !!line)
  .map((id) => urlJoin('https://gyazo.com', id));

const gyazoRuler: ParserBlock.RuleBlock = (state, startLine, endLine, silent) => {
  const pos = state.bMarks[startLine] + state.tShift[startLine];
  const posMax = state.eMarks[startLine];
  const line = state.src.slice(pos, posMax);
  const gyazoUrl = /^(?:https?:)?\/\/(?:i\.)?gyazo\.com\/([a-z0-9]+)(?:\.[a-z0-9])?/.exec(line);

  if (!gyazoUrl || pos >= posMax) {
    return false;
  }

  const id = gyazoUrl[1];

  if (!silent) {
    state.line = startLine + 1;

    const token = state.push('gyazo', '', 0);

    token.content = id;
  }

  return true;
};

const gyazoTokenizer: RenderRule = (
  tokens,
  index,
  options,
  env: { gyazoImageInfo: GyazoOEmbed[] },
) => {
  const { content: id } = tokens[index];
  const { gyazoImageInfo } = env;
  const imageInfo = gyazoImageInfo.find((info) => info.url.includes(id));

  if (!imageInfo) {
    return '';
  }

  const {
    type, provider_name, url, width, height,
  } = imageInfo;

  return `<p><amp-img src="${url}" alt="${type} by ${provider_name}" width="${width / height}" height="1" layout="responsive" /></p>`;
};

const gyazoPlugin: PluginSimple = (md) => {
  md.renderer.rules.gyazo = gyazoTokenizer;
  md.block.ruler.before('paragraph', 'gyazo', gyazoRuler);
};

export { pickGyazoUrl, gyazoPlugin as gyazo };
