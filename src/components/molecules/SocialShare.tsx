import React, { FC } from 'react';

type Props = {
  /** クラス名 */
  className?: string;
  /** シェアするテキスト */
  text?: string;
  /** シェアするURL */
  url?: string;
};

const SocialShareComponent: FC<Props> = ({ className, text, url }) => (
  <div className={className}>
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
      type="system"
      data-param-text={text}
      data-param-url={url}
    />
  </div>
);

export { SocialShareComponent as SocialShare };
