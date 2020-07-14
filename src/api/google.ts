import ky from 'ky-universal';
import urlJoin from 'url-join';

type Response = {
  ampUrls: Array<{
    originalUrl: string;
    ampUrl: string;
    cdnAmpUrl: string;
  }>;
};

/**
 * AMP URLを取得する
 * @param path パス
 */
export const fetchAmpUrl = async (path: string): Promise<string | undefined> => {
  const url = urlJoin('https://b.lollipop.onl', path);

  if (!process.env.GOOGLE_API_KEY) {
    return;
  }

  const response = await ky.post('https://acceleratedmobilepageurl.googleapis.com/v1/ampUrls:batchGet', {
    headers: {
      'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
    },
    json: {
      urls: [url],
    },
  }).json<Response>();

  const cdnAmpUrls = response.ampUrls.map(({ cdnAmpUrl }) => cdnAmpUrl);

  return cdnAmpUrls[0];
};
