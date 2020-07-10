import React, { FC } from 'react';
import styled from 'styled-components';
import { Tag } from '~/api/types';
import * as C from '~/const';
import { url } from '~/utils';

const PostTag = styled.a`
  display: block;
  padding: 8px 16px;
  font-family: var(--primary-font-family);
  font-size: 1.4rem;
  color: #252521;
  text-decoration: none;
  border: 1px solid #aaa;
  border-radius: 100px;

  :hover {
    color: var(--primary-color);
    border-color: var(--primary-color);
  }

  > .icon {
    margin-right: 0.5em;
    font-size: 1.2rem;
  }
`;

type Props = {
  /** クラス名 */
  className?: string;
  /** ブログタグ */
  tag: Tag;
};

const PostTagComponent: FC<Props> = ({ tag, className }) => (
  <PostTag
    href={url(C.PAGES.BLOG_TAG, { tagId: tag.id, page: 1 })}
    className={className}
  >
    <span className="fas fa-tag icon" />
    {tag.name}
  </PostTag>
);

export { PostTagComponent as PostTag };
