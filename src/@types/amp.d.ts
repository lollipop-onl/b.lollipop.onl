declare namespace JSX {
  import { ReactNode } from 'react';

  /** @see https://amp.dev/ja/documentation/guides-and-tutorials/learn/common_attributes/ */
  type CommonAttributes = {
    fallback?: boolean;
    heights?: string;
    layout?: 'nodisplay' | 'fixed' | 'responsive' | 'fixed-height' | 'fill' | 'container' | 'flex-item' | 'intrinsic';
    media?: string;
    noloading?: boolean;
    on?: string;
    placeholder?: boolean;
    sizes?: string;
    width?: string | number;
    height?: string | number;
  };

  /** @see https://amp.dev/ja/documentation/components/amp-social-share */
  type AmpSocialShare = CommonAttributes & {
    type: string;
    [key: string]: string | number | undefined;
  };

  /** @see https://amp.dev/documentation/components/amp-script */
  type AmpScript = CommonAttributes & {
    src?: string;
    script?: string;
    sandbox?: 'allow-forms';
    'max-age'?: string;
    children?: ReactNode;
  };

  /** @see https://amp.dev/ja/documentation/components/amp-img/ */
  type AmpImg = CommonAttributes & {
    src?: string;
    srcset?: string;
    alt?: string;
    attribution?: string;
  };

  /** @see https://amp.dev/ja/documentation/components/amp-twitter */
  type AmpTwitter = CommonAttributes & {
    'data-tweetid'?: string;
    'data-momentid'?: string;
    'data-timeline-source-type'?: string;
    [key: string]: string;
  };

  /** @see https://amp.dev/ja/documentation/components/amp-youtube */
  type AmpYoutube = CommonAttributes & {
    autoplay?: boolean;
    'data-videoid'?: string;
    'data-live-channelid'?: string;
    dock?: boolean;
    credentials?: 'omit' | 'include';
    [key: string]: string;
  };

  interface IntrinsicElements {
    'amp-img': AmpImg;
    'amp-social-share': AmpSocialShare;
    'amp-script': AmpScript;
    'amp-twitter': AmpTwitter;
    'amp-youtube': AmpYoutube;
  }
}
