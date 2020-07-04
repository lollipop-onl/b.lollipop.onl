declare namespace JSX {
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

  /** @see https://amp.dev/ja/documentation/components/amp-img/ */
  type AmpImg = CommonAttributes & {
    src?: string;
    srcset?: string;
    alt?: string;
    attribution?: string;
  };

  interface IntrinsicElements {
    'amp-img': AmpImg;
  }
}
