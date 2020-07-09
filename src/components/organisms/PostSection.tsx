import React, { FC } from 'react';
import styled from 'styled-components';
import { BlogPost, GyazoOEmbed } from '~/api/types';
import { PostContent } from '~/components/atoms/PostContent';
import { PostTitle } from '~/components/atoms/PostTitle';

const StyledPostTitle = styled(PostTitle)`
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
    <div>
      <StyledPostTitle>{post.title}</StyledPostTitle>
      <section>
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
    </div>
  </>
);

export { PostSectionContent as PostSection };
