/** 月の名前 */
export const MONTH_NAME = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** 曜日の名前 */
export const DAY_OF_WEEK_NAME = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * 入力値が正しい日付かどうか
 * @param date 入力値
 */
export const isValidDate = (
  date: unknown,
): boolean => date instanceof Date && !Number.isNaN(date.getTime());

/**
 * 月の名前を取得する
 * @param month 月
 * @param isShorten 短縮するか
 */
export const getMonthName = (
  month: number,
  isShorten = false,
): string => {
  const monthName = MONTH_NAME[month - 1];

  if (isShorten) {
    return monthName.slice(0, 3);
  }

  return monthName;
};

/**
 * 曜日の名前を取得する
 * @param dayOfWeek 曜日のインデックス
 * @param isShorten 短縮するか
 */
export const getDayOfWeekName = (
  dayOfWeek: number,
  isShorten = false,
): string => {
  const dayOfWeekName = DAY_OF_WEEK_NAME[dayOfWeek];

  if (isShorten) {
    return dayOfWeekName.slice(0, 3);
  }

  return dayOfWeekName;
};

/**
 * 2桁の値をゼロ埋めする
 * @param input 入力値
 */
export const padZero = (input: number | string): string => `${input}`.padStart(2, '0');

/** 日付フォーマット */
export type DateFormat = 'LT' | 'LTS' | 'L' | 'l' | 'LL' | 'll' | 'LLL' | 'lll' | 'LLLL' | 'llll';

/**
 * 日付へフォーマットする
 * @param input 入力値
 * @param format フォーマット
 */
export const dateFormat = (input: string | Date, format: DateFormat = 'll'): string => {
  const d = typeof input === 'string' ? new Date(input) : input;

  if (!isValidDate(d)) {
    return input.toString();
  }

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const dayOfWeek = d.getDay();
  const hours = d.getHours() % 12;
  const ampm = d.getHours() > 12 ? 'AM' : 'PM';
  const minutes = padZero(d.getMinutes());
  const seconds = padZero(d.getSeconds());

  switch (format) {
    case 'LT':
      return `${hours}:${minutes} ${ampm}`;
    case 'LTS':
      return `${hours}:${minutes}:${seconds} ${ampm}`;
    case 'L':
      return `${padZero(month)}/${padZero(date)}/${year}`;
    case 'l':
      return `${month}/${date}/${year}`;
    case 'LL':
      return `${getMonthName(month)} ${date}, ${year}`;
    case 'll':
      return `${getMonthName(month, true)} ${date}, ${year}`;
    case 'LLL':
      return `${getMonthName(month)} ${date}, ${year} ${hours}:${minutes} ${ampm}`;
    case 'lll':
      return `${getMonthName(month, true)} ${date}, ${year} ${hours}:${minutes} ${ampm}`;
    case 'LLLL':
      return `${getDayOfWeekName(dayOfWeek)}, ${getMonthName(month)} ${date}, ${year} ${hours}:${minutes} ${ampm}`;
    case 'llll':
      return `${getDayOfWeekName(dayOfWeek, true)}, ${getMonthName(month, true)} ${date}, ${year} ${hours}:${minutes} ${ampm}`;
    default:
      return input.toString();
  }
};
