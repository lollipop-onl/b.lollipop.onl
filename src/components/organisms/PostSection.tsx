import React, { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { BlogPost, GyazoOEmbed } from '~/api/types';
import { PostContent } from '~/components/atoms/PostContent';
import { PostTitle } from '~/components/atoms/PostTitle';
import * as C from '~/const';
import { url } from '~/utils';

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
      <Link href={url(C.PAGES.BLOG_CATEGORY, { categoryId: post.category.id, page: 1 })}>
        <a>
          <span className="fas fa-folder" />
          {post.category.name}
        </a>
      </Link>
      <ol>
        {post.tags.map((tag) => (
          <li key={tag.id}>
            <Link href={url(C.PAGES.BLOG_TAG, { tagId: tag.id, page: 1 })}>
              <a>{tag.name}</a>
            </Link>
          </li>
        ))}
      </ol>
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
