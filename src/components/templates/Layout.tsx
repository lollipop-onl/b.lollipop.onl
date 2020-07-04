import React, { FC } from 'react';
import Head from 'next/head';

type Props = {
  /** ページタイトル */
  title: string;
};

/** レイアウトコンポーネント */
const LayoutComponent: FC<Props> = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </>
);

export { LayoutComponent as Layout };
