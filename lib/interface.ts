import { PencilIcon } from "@heroicons/react/24/outline";
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

export type IconType = typeof PencilIcon;
export interface ModalProps {
  open: boolean;
  callback: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SidebarButtonProps extends ClassNameProp {
  callback: React.Dispatch<React.SetStateAction<boolean>>;
  mobile?: boolean;
}

export interface ChildNodeProps {
  children?: React.ReactNode;
}

export interface UserAccount extends UserDisplay, UserPosts {}

//User Profile Object
export interface UserProfile {
  id: string;
  userId: string;
  job?: string;
  followers: number;
  following: number;
  company?: string;
  pronouns?: string;
  location?: string;
  bio?: string;
  external: ProfileExternalLinks;
}

export interface UserDisplay {
  user: User;
  profile?: UserProfile;
}

export interface UserPosts {
  mediaPosts: MediaPost[];
  textPosts: TextPost[];
}

export interface ProfileExternalLinks {
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

export type Authentication = "authenticated" | "unauthenticated" | "loading";

//Post Interfaces
export type PostType = "TEXT" | "MEDIA";

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
  userPosts: MediaPost[];
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

export interface PostAuxilliaryData {
  userID: string;
  dateCreated: Date;
  dateUpdated?: Date;
  postStatus: PostStatus;
  title: string;
  tags: string[];
  tech: string[];
  thumbnail: string;
}

export interface PostMetrics {
  likeCount: number;
  commentCount: number;
  viewCount: number;
  saveCount: number;
}

export const postTypeMap: Record<PostType, keyof UserPosts> = {
  MEDIA: "mediaPosts",
  TEXT: "textPosts",
};

export interface MediaPost {
  id: string | undefined;
  document: Document;
  auxData: PostAuxilliaryData;
  metrics: PostMetrics;
}

export interface TextPost {
  id: string | undefined;
  userID: string;
  textpost: string;
  createdAt: Date;
  updatedAt?: Date;
  metrics: PostMetrics;
}

export enum PostContentType {
  "IMAGE",
  "VIDEO",
  "GIF",
}

const postStatuses = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;
export type PostStatus = (typeof postStatuses)[number];

const contentBlockTypes = [
  "TEXT",
  "IMAGE",
  "VIDEO",
  "CAROUSEL",
  "PREVIEW",
] as const;
export type ContentBlockType = (typeof contentBlockTypes)[number];

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  parentId?: string;
  dateCreated: Date;
  dateUpdated?: Date;
  likes: number;
  dislikes: number;
}

export interface CommentNode {
  comment: Comment;
  user: UserDisplay;
  children: CommentNode[];
}

export interface Reply extends Omit<CommentNode, "children"> {
  root: CommentNode;
}

export type CommentReactType = "LIKE" | "DISLIKE";
export type NodeMetric = "likes" | "dislikes";

export interface CommentReact {
  id: string;
  commentId: string;
  postId: string;
  userId: string;
  reactType: CommentReactType;
}

export interface UserPostReactions {
  reactions: Map<string, CommentReactType>;
  loading: boolean;
}

export const sortTypes = ["NEWEST", "OLDEST", "TOP"] as const;

export type SortCriteria = (typeof sortTypes)[number];

const postInteractionValue = [
  "LIKE",
  "UNLIKE",
  "SAVE",
  "UNSAVE",
  "VIEW",
  "SHARE",
] as const;
export type PostInteractionType = (typeof postInteractionValue)[number];

const userInteractionValue = ["FOLLOW", "UNFOLLOW", "BLOCK"] as const;
export type UserInteractionType = (typeof userInteractionValue)[number];

export interface PostInteraction {
  postId: string;
  postType: PostType;
  targetId?: string;
}

export interface UserDetails {
  userId: string;
  name: string;
  image: string;
  username: string;
  job?: string;
}

export interface UserNetwork extends UserDetails {
  following: UserInteractionRelationship[];
  followers: UserInteractionRelationship[];
}

export interface UserNode extends UserNetwork {
  blockedUsers: UserInteractionRelationship[];
  likedPosts: PostInteractionRelationship[];
  savedPosts: PostInteractionRelationship[];
}

export interface PostNode {
  postId: string;
  userId: string;
  postDate: Date;
  type: PostType;
  tags: string[];
  tech: string[];
  keywords: string[];
}

export interface PostInteractionRelationship {
  timestamp: Date;
  post: PostNode;
}

export interface PostShareRelationship {
  timestamp: Date;
  post: PostNode;
  receiver: UserNode;
}

export interface UserInteractionRelationship {
  timestamp: Date;
  user: UserDetails;
}

export interface PostInteractionLookup {
  postId: string;
  timeStamp: Date;
}

export interface UserInteractionLookup {
  userId: string;
  timeStamp: Date;
}

const networkStatus = ["friends", "following", "followed", "none"] as const;
export type NetworkStatus = (typeof networkStatus)[number];

export enum RecipientType {
  NETWORK = 0,
  LIKE = 1,
  REPOST = 2,
  COMENT = 3,
  GROUP = 4,
  SUGGESTED = 5,
  PROMOTED = 6,
  AUTHOR = 7,
}

export interface UserFeedKey {
  userId: string;
  postDate: Date;
  postId: string;
}

export interface UserFeed {
  key: UserFeedKey;
  readStatus: boolean;
  postType: PostType;
  groupId: string;
}

export interface PostReferenceKey {
  originatorUserId: string;
  postId: string;
}

export interface PostFeedReference {
  key: PostReferenceKey;
  userId: string;
  postReferenceType: RecipientType;
  postDate: Date;
}

export interface FeedDisplayReference {
  userFeed: UserFeed;
  recipientReferences: Map<RecipientType, PostFeedReference[]>;
}

export interface FeedPost extends FeedDisplayReference{
  type: PostType;
  post: MediaPost | TextPost;
  users: Map<String, UserDetails>
}

