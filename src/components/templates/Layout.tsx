import React, { FC } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { GlobalHeader } from '~/components/organisms/GlobalHeader';
import { containerMixin } from '~/components/mixins';
import * as C from '~/const';

type Props = {
  /** ページタイトル */
  title: string;
};

const LayoutComponent: FC<Props> = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Header />
    <Container>
      {children}
    </Container>
  </>
);

const Header = styled(GlobalHeader)`
  margin-bottom: 32px;
`;

const Container = styled.div`
  ${containerMixin};
`;

export { LayoutComponent as Layout };
