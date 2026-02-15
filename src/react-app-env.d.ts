/// <reference types="react-scripts" />

declare module 'store' {
  const store: {
    get(key: string): any;
    set(key: string, value: any): void;
  };
  export default store;
}

declare module 'react-share' {
  import * as React from 'react';

  interface ShareButtonProps {
    url: string;
    children?: React.ReactNode;
  }

  interface IconProps {
    size: number;
    round?: boolean;
  }

  interface ShareCountProps {
    url: string;
    children?: (count: number) => React.ReactNode;
  }

  export const FacebookShareButton: React.FC<ShareButtonProps>;
  export const TwitterShareButton: React.FC<ShareButtonProps>;
  export const RedditShareButton: React.FC<ShareButtonProps>;
  export const EmailShareButton: React.FC<ShareButtonProps>;
  export const FacebookIcon: React.FC<IconProps>;
  export const TwitterIcon: React.FC<IconProps>;
  export const RedditIcon: React.FC<IconProps>;
  export const EmailIcon: React.FC<IconProps>;
  export const FacebookShareCount: React.FC<ShareCountProps>;
  export const RedditShareCount: React.FC<ShareCountProps>;
}
