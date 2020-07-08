import React, { FC } from 'react';
import styled from 'styled-components';
import { PostSidebarToC } from '~/components/organisms/PostSidebarToC';

const PostSidebarAdsense = styled.div`
  width: 100%;
  margin-bottom: 32px;
  border: 1px dashed #aaa;

  &::before {
    display: block;
    padding-top: 100%;
    content: '';
  }
`;

const PostSidebarSticky = styled.div`
  position: sticky;
  top: 0;
  max-height: 80vh;
  padding-top: 32px;
  margin-top: -32px;
  overflow-y: auto;
`;

type Props = {
  /** コンテンツMarkdown */
  content: string;
};

const PostSidebarComponent: FC<Props> = ({ content }) => {
  const headings = content.split('\n').filter((line) => line.startsWith('#'));

  return (
    <>
      <PostSidebarAdsense />
      <PostSidebarSticky>
        { headings.length > 0 ? <PostSidebarToC headings={headings} /> : null }
      </PostSidebarSticky>
    </>
  );
};

export { PostSidebarComponent as PostSidebar };
