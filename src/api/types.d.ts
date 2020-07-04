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

/** コンテンツのモデルを定義する */
export type DefineContentModel<T extends Record<string, any>> = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
} & T;

/** リストのモデルを定義する */
export type DefineListModel<T> = {
  contents: T[];
};

/** ブログポスト */
export type BlogPost = DefineContentModel<{
  /** タイトル */
  title: string;
  /** アイキャッチ画像URL */
  eyecatchUrl?: string;
  /** カテゴリ */
  category: any;
  /** タグ */
  tags: any[];
  /** 本文 */
  content: string;
  /** 関連記事 */
  relatedPosts: BlogPost[];
}>;

/** ブログポストリスト */
export type BlogPostList = DefineListModel<BlogPost>;

/** タグ */
export type Tag = DefineContentModel<{
  /** タグ名 */
  name: string;
}>;

/** タグリスト */
export type TagList = DefineListModel<Tag>;

/** カテゴリ */
export type Category = DefineContentModel<{
  /** カテゴリ名 */
  name: string;
}>;

/** カテゴリリスト */
export type CategoryList = DefineListModel<Category>;
