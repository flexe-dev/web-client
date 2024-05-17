import { User } from "next-auth";
import { UserProfile, UserPost, PostContent } from "@prisma/client";

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
  file: File;
}

export interface PostUserMediaThumbnail {
  thumbnail: string | undefined;
  contentID: string;
}

export type ContentType = "title" | "subtitle" | "text" | "image" | "video";

export interface ContentStyling {
  id: string;
  type: ContentType;
}

export interface ContentBlockProp {
  id: string;
  value?: string | PostUserMedia;
  style?: Record<string, string>;
}

export interface PostContentBlock extends ContentBlockProp {
  content: (props: ContentBlockProp) => React.JSX.Element;
}
