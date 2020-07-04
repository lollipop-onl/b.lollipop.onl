/**
 * CSSに単位を付与する
 * @param value 値
 * @param fallbackUnit フォールバックする単位
 */
export const cssUnit = (value: number | string, fallbackUnit = 'px'): string => {
  const val = `${value}`;

  return /^(?:-+)?[0-9.]+$/.test(val) ? [val, fallbackUnit].join('') : val;
};
