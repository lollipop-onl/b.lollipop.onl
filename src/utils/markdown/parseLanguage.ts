import hljs from 'highlight.js/lib/core';

type Language = {
  language?: string;
  displayName: string;
  isFileName?: boolean;
};

/**
 * 言語から言語名、ファイル名を取得する
 * @param src ソースの言語
 */
const parseLanguage = (src: string): Language => {
  // lang:fileName のパターンをパースする
  const langMatches = src.match(/^([^:]+):(.*)$/);

  if (langMatches) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, language, displayName] = langMatches;

    if (hljs.getLanguage(language)) {
      return { language, displayName, isFileName: true };
    }
  }

  // fileName のパターンをパースする
  const extMatches = src.match(/\.([^.]+)$/);

  if (extMatches) {
    const [, extension] = extMatches;

    if (hljs.getLanguage(extension)) {
      // @ts-ignore
      return { language: extension, displayName: src, isFileName: true };
    }
  }

  // lang のパターンをパースする
  const lang = hljs.getLanguage(src);

  if (lang) {
    // @ts-ignore
    return { language: src, displayName: lang.name };
  }

  return { displayName: 'Plain Text' };
};

export default parseLanguage;
