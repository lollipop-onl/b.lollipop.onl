import MarkdownIt, { PluginSimple } from 'markdown-it';
import { RenderRule } from 'markdown-it/lib/renderer';
import ParserBlock from 'markdown-it/lib/parser_block';

const youtubeRuler: ParserBlock.RuleBlock = (state, startLine, endLine, silent) => {
  const pos = state.bMarks[startLine] + state.tShift[startLine];
  const posMax = state.eMarks[startLine];
  const line = state.src.slice(pos, posMax);
  const youtubeUrl = /^https?:\/\/(?:www\.)?(?:youtube\.com\/watch.+|youtu\.be\/[0-9a-zA-Z-]+)$/.exec(line);

  if (!youtubeUrl || pos >= posMax) {
    return false;
  }

  const url = youtubeUrl[0];

  if (!silent) {
    state.line = startLine + 1;

    const token = state.push('youtube', '', 0);

    token.content = url;
  }

  return true;
};

const youtubeTokenizer = (md: MarkdownIt): RenderRule => (tokens, index) => {
  const { content } = tokens[index];
  const matches = /(?:[?&]v=|youtu\.be\/)([0-9a-zA-Z-]+)/.exec(content);

  if (!matches) {
    return '';
  }

  const videoId = md.utils.escapeHtml(matches[1]);

  return `<amp-youtube data-videoid="${videoId}" width="640" height="360" layout="responsive"></amp-youtube>`;
};

const youtubePlugin: PluginSimple = (md) => {
  md.renderer.rules.youtube = youtubeTokenizer(md);
  md.block.ruler.before('paragraph', 'youtube', youtubeRuler);
};

export { youtubePlugin as youtube };
