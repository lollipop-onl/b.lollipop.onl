import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import * as C from '~/const';
import { cssUnit } from '~/utils';

const postContentHeadingMixin = (content: string) => css`
  display: flex;
  align-items: flex-start;
  margin: 1.4em 0 0.8em;
  font-weight: bold;

  &::before {
    display: block;
    content: "${content}";
    padding: 0.2em 0;
    margin-right: 0.4em;
    font-size: 0.8em;
    font-family: var(--accent-font-family);
  }

  > a {
    flex-shrink: 0;
    margin-left: auto;
    font-size: 1.6rem;
    color: #555;
    text-decoration: none;
  }

  > a:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }
`;

const PostContent = styled.div`
  line-height: 1.8;
  word-break: break-all;

  h1 {
    ${postContentHeadingMixin('#')};
    font-size: 2.4rem;
  }

  h2 {
    ${postContentHeadingMixin('##')};
    font-size: 2.0rem;
  }

  h3 {
    ${postContentHeadingMixin('###')};
    font-size: 1.6rem;
  }

  h4 {
    ${postContentHeadingMixin('####')};
    font-size: 1.4rem;
  }

  p, pre {
    margin-bottom: 16px;
  }

  code {
    padding: 0 0.3em;
    font-family: var(--monospace-font-family);
  }

  p > code {
    margin: 0 0.3em;
    font-size: 0.9em;
    background: #eee;
    border: 1px solid #aaa;
    border-radius: 4px;
  }

  a {
    padding: 0 0.2em;
    color: #252521;
  }

  a:hover {
    color: var(--primary-color);
    text-decoration: none;
  }

  ul, ol {
    margin: 0 0 16px 32px;

    & > li:not(:first-child) {
      margin-top: 8px;
    }
  }

  ul {
    list-style-type: square;
  }

  ol {
    list-style-type: decimal;
  }

  .codeBlock {
    @media (max-width: 800px) {
      width: calc(100% + ${cssUnit(C.$containerMargin * 2)});
      margin-left: -${cssUnit(C.$containerMargin)};
    }

    > code {
      display: block;
      padding: 0;
      font-size: 1.4rem;
    }
  }

  .codeBlockHeader {
    & {
      display: flex;
      align-items: center;
      padding: 16px 24px 8px;
      color: #c5c8c6;
      background: #1d1f21;
    }

    & > .name {
      font-family: var(--accent-font-family);
      font-weight: bold;
    }

    & > .name > .icon {
      margin-right: 8px;
      font-size: 0.8rem;
    }
  }

  .embedPage {
    & {
      display: grid;
      grid-template:
        "thumbnail  sitename    icon"         auto
        "thumbnail  title       title"        auto
        "thumbnail  .           ."            1fr
        "thumbnail  url         url"          auto
        /auto      1fr          auto;
      padding: 16px;
      color: #191919;
      text-decoration: none;
      border: 1px solid #ccc;

      @media (max-width: 800px) {
        padding: 8px;
      }
    }

    & > .thumbnail {
      position: relative;
      width: 100px;
      height: 100px;
      grid-area: thumbnail;
      margin-right: 16px;

      @media (max-width: 800px) {
        width: 60px;
        height: 60px;
        margin-right: 8px;
      }
    }

    & > .thumbnail > .image > img {
      object-fit: cover;
    }

    & > .sitename {
      grid-area: sitename;
      margin-bottom: 8px;
      font-size: 1.4rem;
      line-height: 1.5em;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    & > .icon {
      grid-area: icon;
      margin-left: 8px;
      font-size: 1.4rem;
      color: #666;
      line-height: 1.5em;
    }

    & > .title {
      grid-area: title;
      max-height: 3em;
      font-size: 1.6rem;
      font-weight: bold;
      line-height: 1.5em;
      overflow: hidden;
    }

    & > .url {
      grid-area: url;
      margin-top: 8px;
      color: #252521;
      font-size: 1.3rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &:hover {
      border-color: var(--primary-color);
    }

    &:hover > .icon {
      color: var(--primary-color);
    }

    &:hover > .title {
      text-decoration: underline;
    }
  }

  amp-img {
    max-width: 100%;
  }

  /* Tomorrow Night Theme */
  /* http://jmblog.github.com/color-themes-for-google-code-highlightjs */
  /* Original theme - https://github.com/chriskempson/tomorrow-theme */
  /* http://jmblog.github.com/color-themes-for-google-code-highlightjs */

  /* Tomorrow Comment */
  .hljs-comment,
  .hljs-quote {
    color: #969896;
  }

  /* Tomorrow Red */
  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class,
  .hljs-regexp,
  .hljs-deletion {
    color: #c66;
  }

  /* Tomorrow Orange */
  .hljs-number,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params,
  .hljs-meta,
  .hljs-link {
    color: #de935f;
  }

  /* Tomorrow Yellow */
  .hljs-attribute {
    color: #f0c674;
  }

  /* Tomorrow Green */
  .hljs-string,
  .hljs-symbol,
  .hljs-bullet,
  .hljs-addition {
    color: #b5bd68;
  }

  /* Tomorrow Blue */
  .hljs-title,
  .hljs-section {
    color: #81a2be;
  }

  /* Tomorrow Purple */
  .hljs-keyword,
  .hljs-selector-tag {
    color: #b294bb;
  }

  .hljs {
    display: block;
    padding: 8px 16px 16px;
    overflow-x: auto;
    font-family: var(--monospace-font-family);
    color: #c5c8c6;
    background: #1d1f21;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
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
