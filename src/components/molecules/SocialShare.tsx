import React, { FC } from 'react';
import styled from 'styled-components';

const SocialShare = styled.div`
  display: flex;
  width: 100%;

  > amp-social-share {
    flex: 1 0;
    background-size: 36px;
  }

  > amp-social-share[type=hatena_bookmark] {
    background: #01a5de url(/images/logos/hatenabookmark.svg) center center no-repeat;
  }
`;

type Props = {
  /** クラス名 */
  className?: string;
  /** シェアするテキスト */
  text?: string;
  /** シェアするURL */
  url?: string;
};

const SocialShareComponent: FC<Props> = ({ className, text, url = 'CANONICAL_URL' }) => (
  <SocialShare className={className}>
    <amp-social-share
      type="twitter"
      data-param-text={text}
      data-param-url={url}
    />
    <amp-social-share
      type="facebook"
      data-param-text={text}
      data-param-url={url}
    />
    <amp-social-share
      type="hatena_bookmark"
      data-param-text={text}
      data-share-endpoint={`http://b.hatena.ne.jp/entry/${url}`}
    />
    <amp-social-share
      type="system"
      data-param-text={text}
      data-param-url={url}
    />
  </SocialShare>
);

export { SocialShareComponent as SocialShare };
