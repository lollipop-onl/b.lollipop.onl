import React, { FC } from 'react';
import styled from 'styled-components';
import { PostSidebarToC } from '~/components/organisms/PostSidebarToC';
import { PostTag } from '~/components/atoms/PostTag';
import { SocialShare } from '~/components/molecules/SocialShare';
import { Tag } from '~/api/types';

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

const StyledSocialShare = styled(SocialShare)`
  margin-bottom: 32px;
`;

const PostSidebarTags = styled.div`
  margin-bottom: 32px;

  > .tags {
    display: flex;
    flex-wrap: wrap;
  }

  > .tags > .tag {
    margin-bottom: 8px;
  }

  > .tags > .tag:not(:last-child) {
    margin-right: 8px;
  }
`;

type Props = {
  /** コンテンツID */
  id: string;
  /** コンテンツタイトル */
  title: string;
  /** コンテンツMarkdown */
  content: string;
  /** タグ */
  tags: Tag[];
};

const PostSidebarComponent: FC<Props> = ({ content, tags }) => {
  const headings = content.split('\n').filter((line) => line.startsWith('#'));

  return (
    <>
      <PostSidebarAdsense />
      <StyledSocialShare />
      <PostSidebarTags>
        <ol className="tags">
          {tags.map((tag) => (
            <li
              key={tag.id}
              className="tag"
            ><PostTag tag={tag} />
            </li>
          ))}
        </ol>
      </PostSidebarTags>
      <PostSidebarSticky>
        { headings.length > 0 ? <PostSidebarToC headings={headings} /> : null }
      </PostSidebarSticky>
    </>
  );
};

export { PostSidebarComponent as PostSidebar };
