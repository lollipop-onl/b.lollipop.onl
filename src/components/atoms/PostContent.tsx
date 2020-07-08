import React, { FC } from 'react';
import styled from 'styled-components';

const PostContent = styled.div`
  p {
    margin-bottom: 16px;
  }

  amp-img {
    max-width: 100%;
  }
`;

type Props = {
  /** コンテンツHTML */
  html: string;
};

const PostContentComponent: FC<Props> = ({ html }) => (
  <PostContent>
    <div
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </PostContent>
);

export { PostContentComponent as PostContent };
