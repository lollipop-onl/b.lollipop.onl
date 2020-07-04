import React, { FC } from 'react';
import styled from 'styled-components';

type Props = {};

const Paragraph = styled.p`
  color: #f00;
`;

export const config = { amp: true };

export const IndexPage: FC<Props> = () => <div><Paragraph>Hello World.</Paragraph><amp-img src="https://i.gyazo.com/4d550f2d023ad0712be31755eb95694c.jpg" width={200} height={200} /></div>;

export default IndexPage;
