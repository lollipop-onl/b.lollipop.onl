import React, { FC } from 'react';
import styled from 'styled-components';
import { BlogPost, GyazoOEmbed } from '~/api/types';
import { PostContent } from '~/components/atoms/PostContent';
import { PostTitle } from '~/components/atoms/PostTitle';
import * as C from '~/const';
import { dateFormat, url } from '~/utils';

const StyledPostTitle = styled(PostTitle)`
  margin-bottom: 16px;
`;

const StyledPostCategory = styled.a`
  color: #252512;
  text-decoration: none;

  > .icon {
    margin-right: 0.5em;
  }

  > .text {
    text-decoration: underline;
  }

  :hover {
    color: var(--primary-color);
  }

  :hover > .text {
    text-decoration: none;
  }
`;

const StyledPostDate = styled.dl`
  display: flex;
  margin-left: auto;
  font-size: 1.4rem;

  @media (max-width: 800px) {
    margin: 16px 0 0;
  }

  > .label {

  }

  > .date {
    font-family: var(--accent-font-family);
  }
`;

const StyledPostHeader = styled.div`
  display: flex;
  margin-bottom: 24px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
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

export const PostSectionContent: FC<Props> = ({ post, thumbnailImage, contentHtml }) => {
  const isModified = post.publishedAt !== post.updatedAt;

  return (
    <>
      <div>
        <StyledPostTitle>{post.title}</StyledPostTitle>
        <StyledPostHeader>
          <StyledPostCategory href={url(C.PAGES.BLOG_CATEGORY, { categoryId: post.category.id, page: 1 })}>
            <span className="icon fas fa-folder-open" />
            <span className="text">{post.category.name}</span>
          </StyledPostCategory>
          <StyledPostDate>
            <dt className="label">{isModified ? '更新日時' : '作成日時'}：</dt>
            <dd className="date">
              {isModified ? (
                <time dateTime={post.updatedAt}>{dateFormat(post.updatedAt, 'll')}</time>
              ) : (
                <time dateTime={post.publishedAt}>{dateFormat(post.publishedAt, 'll')}</time>
              )}
            </dd>
          </StyledPostDate>
        </StyledPostHeader>
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
};

export { PostSectionContent as PostSection };
