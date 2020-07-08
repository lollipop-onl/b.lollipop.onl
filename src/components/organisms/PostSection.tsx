import React, { FC } from 'react';
import styled from 'styled-components';
import { BlogPost, GyazoOEmbed } from '~/api/types';
import { PostContent } from '~/components/atoms/PostContent';
import { PostHeading } from '~/components/atoms/PostHeading';

const StyledPostHeading = styled(PostHeading)`
  margin-bottom: 24px;
`;

const StyledPostThumbnail = styled.div`
  margin-bottom: 48px;
`;

type Props = {
  /** ブログポスト */
  post: BlogPost;
  /** サムネイル画像情報 */
  thumbnailImage?: GyazoOEmbed;
  /** コンテンツのHTML */
  contentHtml: string;
};

export const PostSectionContent: FC<Props> = ({ post, thumbnailImage, contentHtml }) => (
  <>
    <section>
      <StyledPostHeading>{post.title}</StyledPostHeading>
      { thumbnailImage ? (
        <StyledPostThumbnail>
          <amp-img
            src={thumbnailImage.url}
            width={thumbnailImage.width}
            height={thumbnailImage.height}
            layout="responsive"
          />
        </StyledPostThumbnail>
      ) : null }
      <PostContent html={contentHtml} />
    </section>
  </>
);

export { PostSectionContent as PostSection };
