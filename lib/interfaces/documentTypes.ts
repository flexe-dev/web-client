import { CSSProperties } from "react";

//Post Interfaces
export interface PostUserMedia {
  content: PostContent;
  file?: File;
}

export interface PostContent {
  id: string;
  location: string;
  format: PostContentType;
  width: number;
  height: number;
  alt: string;
  uploaded: boolean;
}

export interface PostUserMediaThumbnail {
  thumbnail: string | undefined;
  contentID: string;
}

export type ContentType = "text" | "image" | "video" | "carousel";

export interface ContentStyling {
  id: string;
  type: ContentType;
}

export interface ContentBlockOptions {
  playOnHover?: boolean;
  carouselAutoplay?: boolean;
  carouselLoop?: boolean;
  carouselStopOnMouseEnter?: boolean;
  carouselDuration?: number;
  activeIndex?: number;
}

export type OptionKeys = keyof ContentBlockOptions;
export type OptionKeyValues = ContentBlockOptions[OptionKeys];

export interface ContentValue {
  contentValue: string | PostUserMedia | PostUserMedia[];
}

export interface ContentBlockProp {
  id: string;
  value?: ContentValue;
  style?: CSSProperties;
  options?: ContentBlockOptions;
  type?: ContentBlockType;
}

export type ContentComponent = (props: ContentBlockProp) => React.JSX.Element;

export interface ToolValueObject<T> {
  icon: React.ReactNode;
  value: T;
  tooltip?: string;
}
export type Document = ContentBlockProp[];

export enum PostContentType {
  "IMAGE",
  "VIDEO",
  "GIF",
}

const contentBlockTypes = [
  "TEXT",
  "IMAGE",
  "VIDEO",
  "CAROUSEL",
  "PREVIEW",
] as const;
export type ContentBlockType = (typeof contentBlockTypes)[number];
