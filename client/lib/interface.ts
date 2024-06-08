import { PostStatus, UserProfile } from "@prisma/client";
import { User } from "next-auth";
import { CSSProperties } from "react";
export interface ClassNameProp {
  className?: string;
}

export interface LinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  restrict?: boolean;
}

export interface SidebarButtonProps extends ClassNameProp {
  callback: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChildNodeProps {
  children?: React.ReactNode;
}

//Profile Interfaces
export interface LoadingProps {
  loading: boolean;
}

export interface UserObject extends LoadingProps {
  user: User | undefined;
}

export interface ProfileObject extends LoadingProps {
  profile: UserProfile | undefined;
}

export interface PostObject extends LoadingProps {
  userPosts: UserPost[];
}

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
export type ContentValue = string | PostUserMedia | PostUserMedia[];
export interface ContentBlockProp {
  id: string;
  value?: ContentValue;
  style?: CSSProperties;
  options?: ContentBlockOptions;
  type: ContentBlockType;
}

export interface PostContentBlock extends ContentBlockProp {
  content: (props: ContentBlockProp) => React.JSX.Element;
}

export interface ToolValueObject<T> {
  icon: React.ReactNode;
  value: T;
  tooltip?: string;
}

export interface PostAuxilliaryData {
  id: string | undefined;
  postStatus: PostStatus;
  title: string;
  tags: string[];
  tech: string[];
  thumbnail: PostUserMedia | undefined;
}

export interface PostExternalData {
  likes: number;
  comments: number;
  views: number;
}

export interface UserPost {
  document: PostContentBlock[];
  data: PostAuxilliaryData;
  external: PostExternalData;
}

export enum PostContentType {
  "IMAGE",
  "VIDEO",
  "GIF",
}

export enum ContentBlockType {
  "TEXT",
  "IMAGE",
  "VIDEO",
  "CAROUSEL",
}
