import React, { FC } from 'react';
import Head from 'next/head';
import { GlobalHeader } from '~/components/organisms/GlobalHeader';

type Props = {
  /** ページタイトル */
  title: string;
};

const LayoutComponent: FC<Props> = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <GlobalHeader />
    {children}
  </>
);

export { LayoutComponent as Layout };
