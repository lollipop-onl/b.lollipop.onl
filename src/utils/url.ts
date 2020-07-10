import urlJoin from 'url-join';

/**
 * Replace path parameters in url
 * @param originalUrl URL
 * @param pathParameters Path parameters
 * @param withDomain Includes domain
 */
export const url = (
  originalUrl: string,
  pathParameters: Record<string, string | number | undefined>,
  withDomain = false,
): string => {
  const path = originalUrl
    .split('/')
    .map((chunk) => chunk.replace(/^(:)(.+)/, (match, p1, p2) => {
      const parameter = pathParameters[p2];

      if (!parameter) {
        return '';
      }

      return parameter.toString() || '';
    }))
    .join('/');

  return withDomain ? urlJoin('https://b.lollipop.onl', path) : path;
};
