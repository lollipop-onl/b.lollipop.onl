import React, { FC, ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GlobalHeader } from '~/components/organisms/GlobalHeader';
import { containerMixin } from '~/components/mixins';
import { usePageDescription, usePageTitle, usePageUrl } from '~/hooks';

const Layout = styled.div`
  display: flex;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const LayoutMain = styled.div`
  flex-grow: 1;
`;

const LayoutSidebar = styled.div`
  flex-shrink: 0;
  width: 320px;
  margin-left: 24px;

  @media (max-width: 800px) {
    flex-grow: 1;
    width: 100%;
    margin-top: 24px;
    margin-left: auto;
  }
`;

type Props = {
  /** ページタイトル */
  title?: string;
  /** ページ説明 */
  description?: string;
  /** og:type */
  ogType?: 'website' | 'blog' | 'article';
  /** og:image */
  ogImage?: string;
  /** サイドバー */
  sidebar?: ReactNode;
};

const LayoutComponent: FC<Props> = ({
  title,
  description,
  ogType = 'blog',
  ogImage,
  sidebar,
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
        <meta property="og:image" content={ogImage} />
      </Head>
      <Header />
      <Container>
        <Layout>
          <LayoutMain>
            {children}
          </LayoutMain>
          { sidebar ? (
            <LayoutSidebar>
              {sidebar}
            </LayoutSidebar>
          ) : null }
        </Layout>
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
