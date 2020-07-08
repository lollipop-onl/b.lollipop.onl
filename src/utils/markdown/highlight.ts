import { PluginSimple } from 'markdown-it';
import { RenderRule } from 'markdown-it/lib/renderer';
import hljs from 'highlight.js/lib/core';
import * as languages from './languages';
import parseLanguage from './parseLanguage';

Object.entries(languages).forEach(([name, language]) => {
  hljs.registerLanguage(name, language);
});

const wrap = (render?: RenderRule): RenderRule | undefined => {
  if (!render) {
    return render;
  }

  // eslint-disable-next-line func-names
  return function (this: any, ...args) {
    return render
      .apply(this, args)
      .replace(/<pre +class="/g, '<pre class="codeBlock ')
      .replace(/<pre>/g, '<pre class="codeBlock">');
  };
};

const highlight: PluginSimple = (md) => {
  md.options.highlight = (str, lang) => {
    const { language, displayName, isFileName } = parseLanguage(lang);
    let source = md.utils.escapeHtml(str);

    if (language) {
      source = hljs.highlight(language, str).value;
    }

    const isPlainText = displayName === 'Plain Text';
    const isConsole = ['Shell Session', 'Bash'].includes(displayName);
    const iconName = isFileName
      ? 'fa-file-code'
      : isConsole
        ? 'fa-terminal'
        : isPlainText
          ? 'fa-pen-nib'
          : 'fa-code';

    return `<span class="codeBlockHeader"><span class="name"><span class="fas ${iconName} icon"></span>${displayName}</span></span><span class="hljs">${source}</span>`;
  };

  md.renderer.rules.fence = wrap(md.renderer.rules.fence);
  md.renderer.rules.code_block = wrap(md.renderer.rules.code_block);
};

export { highlight };
