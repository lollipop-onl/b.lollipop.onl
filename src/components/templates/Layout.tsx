import path from 'path';
import React, { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GlobalHeader } from '~/components/organisms/GlobalHeader';
import { containerMixin } from '~/components/mixins';
import { usePageDescription, usePageTitle, usePageUrl } from '~/hooks';

type Props = {
  /** ページタイトル */
  title?: string;
  /** ページ説明 */
  description?: string;
  /** og:type */
  ogType?: 'website' | 'blog' | 'article';
};

const LayoutComponent: FC<Props> = ({
  title,
  description,
  ogType = 'blog',
  children,
}) => {
  const { asPath } = useRouter();
  const pageTitle = usePageTitle(title);
  const pageUrl = usePageUrl(asPath);
  const pageDescription = usePageDescription(description);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="b.lollipop.onl" />
      </Head>
      <Header />
      <Container>
        <pre>{asPath}</pre>
        {children}
      </Container>
    </>
  );
};

const Header = styled(GlobalHeader)`
  margin-bottom: 32px;
`;

const Container = styled.div`
  ${containerMixin};
`;

export { LayoutComponent as Layout };
