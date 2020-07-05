/**
 * Replace path parameters in url
 * @param originalUrl URL
 * @param pathParameters Path parameters
 */
export const url = (
  originalUrl: string,
  pathParameters: Record<string, string | number | undefined>,
): string => originalUrl
  .split('/')
  .map((chunk) => chunk.replace(/^(:)(.+)/, (match, p1, p2) => {
    const parameter = pathParameters[p2];

    if (!parameter) {
      return '';
    }

    return parameter.toString() || '';
  }))
  .join('/');
