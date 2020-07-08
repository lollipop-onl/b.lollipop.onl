import React, { FC } from 'react';
import styled from 'styled-components';
import { slugify } from '~/utils';

const PostSidebarToCLink = styled.a`
  display: inline-block;
  padding: 4px 0;
  font-size: 1.4rem;
  color: #252521;
  text-decoration: none;
  line-height: 1.8;

  &::before {
    margin-right: 1em;
    color: #454545;
    font-family: var(--accent-font-family);
    font-weight: bold;
    content: attr(data-hash);
  }

  &:hover {
    color: var(--primary-color);
  }

  &:hover::before {
    color: var(--primary-color);
  }
`;

type Props = {
  /** 見出しテキストのリスト */
  headings: string[];
};

const PostSidebarToCComponent: FC<Props> = ({ headings }) => (
  <ul>
    { headings.map((heading) => {
      const matches = /^#+/.exec(heading);
      const level = matches ? matches[0].length : 0;
      const text = heading.replace(/^#+\s*/, '');

      return (
        <li key={heading}>
          <PostSidebarToCLink
            href={`#${slugify(heading)}`}
            className="tocLink"
            data-hash={'#'.repeat(level)}
          >{text}
          </PostSidebarToCLink>
        </li>
      );
    })}
  </ul>
);

export { PostSidebarToCComponent as PostSidebarToC };
