import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {};

const LogoComponent: FC<Props> = () => <Logo>b.lollipop.onl</Logo>;

const Logo = styled.span`
  font-family: Quicksand, sans-serif;
  font-size: 2.4rem;
  text-indent: 0.2em;
  letter-spacing: 0.2em;
`;

export { LogoComponent as Logo };
