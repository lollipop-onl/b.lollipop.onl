import React, { FC } from 'react';
import styled from 'styled-components';

const PostHeading = styled.h1`
  position: relative;
  padding: 16px 16px 16px 32px;
  line-height: 1.8;
  background: #454545;
  border-radius: 4px;
  word-break: break-all;
  color: #eee;
  letter-spacing: 0.2em;
  font-weight: bold;

  &::before {
    position: absolute;
    top: 14px;
    bottom: 14px;
    left: 14px;
    width: 5px;
    content: '';
    background: var(--primary-color);
  }
`;

type Props = {
  /** クラス名 */
  className?: string;
};

const PostHeadingComponent: FC<Props> = ({ children, className }) => (
  <PostHeading
    className={className}
  >{children}
  </PostHeading>
);

export { PostHeadingComponent as PostHeading };
