import React, { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import * as C from '~/const';
import { containerMixin, logoMixin } from '~/components/mixins';

type Props = {
  className?: string;
};

const GlobalHeaderComponent: FC<Props> = ({ className }) => (
  <Foundation className={className}>
    <Container>
      <Link href={C.PAGES.TOP} passHref>
        <LogoLink>
          lollipop.onl
        </LogoLink>
      </Link>
    </Container>
  </Foundation>
);

const Foundation = styled.header`
  background: var(--primary-color);
`;

const Container = styled.div`
  ${containerMixin({ width: C.$containerWideWidth })};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const LogoLink = styled.a`
  ${logoMixin};
  color: var(--primary-text-color);
  text-decoration: none;
`;

export { GlobalHeaderComponent as GlobalHeader };
