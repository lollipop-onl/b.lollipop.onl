import React, { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Logo } from '~/components/atoms/Logo';
import * as C from '~/const';
import { containerMixin } from '~/components/mixins';

type Props = {};

const GlobalHeaderComponent: FC<Props> = () => (
  <Foundation>
    <Container>
      <Link href={C.PAGES.TOP} prefetch passHref>
        <LogoLink>
          <Logo />
        </LogoLink>
      </Link>
    </Container>
  </Foundation>
);

const Foundation = styled.header`
  background: var(--primary-color);
`;

const Container = styled.div`
  ${containerMixin};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const LogoLink = styled.a`
  color: var(--primary-text-color);
  text-decoration: none;
`;

export { GlobalHeaderComponent as GlobalHeader };
