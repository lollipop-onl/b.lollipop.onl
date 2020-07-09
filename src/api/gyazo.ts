import ky from 'ky-universal';
import urlJoin from 'url-join';
import { GyazoOEmbed } from '~/api/types';

export const getGyazoUrl = (url: string): string => {
  let imageId: string | undefined;

  if (/^[0-9a-z]+$/.test(url)) {
    imageId = url;
  }

  const matches = /^https:\/\/.+\/([0-9a-f]+)\.(?:jpe?g|png)$/.exec(url);

  if (matches) {
    const { 1: id } = matches;

    imageId = id;
  }

  if (imageId) {
    return urlJoin('https://gyazo.com/', imageId);
  }

  return url;
};

export const fetchGyazoImageInfo = async (url: string | string[]): Promise<GyazoOEmbed[]> => {
  const gyazoUrlList = Array.isArray(url) ? url : [url];

  return Promise
    .all(gyazoUrlList.map((gyazoUrl) => ky.get('https://api.gyazo.com/api/oembed', {
      searchParams: {
        url: getGyazoUrl(gyazoUrl),
      },
    }).json<GyazoOEmbed>()));
};
