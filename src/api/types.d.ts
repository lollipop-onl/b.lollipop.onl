/** リスト取得のクエリ */
export type FetchListQuery = {
  /** 下書き状態のコンテンツを一覧中に含めるためのパラメータ */
  draftKey?: string;
  /** 取得件数を指定 */
  limit?: number;
  /** 何件目から取得するかを指定 */
  offset?: number;
  /** コンテンツの全文検索 */
  q?: string;
  /** コンテンツの中で取得 */
  fields?: string;
  /** 公開されているコンテンツの中から取得するコンテンツを絞り込み */
  filters?: string;
  /** 参照コンテンツを取得する階層の深さを指定 */
  depth?: number;
};

/** コンテンツ取得のクエリ */
export type FetchContentQuery = {
  /** 下書き状態のコンテンツを一覧中に含めるためのパラメータ */
  draftKey?: string;
  /** コンテンツの中で取得 */
  fields?: string;
  /** 参照コンテンツを取得する階層の深さを指定 */
  depth?: number;
};
