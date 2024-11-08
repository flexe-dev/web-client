import { PencilIcon } from "@heroicons/react/24/outline";
import { List } from "lodash";
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

export interface ModalInteractionProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  tags: string[];
}

export interface PostMetrics {
  likeCount: number;
  commentCount: number;
  viewCount: number;
  saveCount: number;
  repostCount: number;
  shareCount: number;
}

export const postTypeMap: Record<PostType, keyof UserPosts> = {
  MEDIA: "mediaPosts",
  TEXT: "textPosts",
};

export interface Post {
  id?: string;
  auxData: PostAuxilliaryData;
  metrics: PostMetrics;
  postType: PostType;
}

export interface PostReferences {
  postId?: string;
  userId: string;
}

export interface MediaDocument extends PostReferences {
  document: Document;
  title: string;
  postStatus: PostStatus;
  thumbnail: string;
}

export interface TextContent extends PostReferences {
  content: string;
  media: PostContent[];
}

export interface MediaPost extends Post {
  document: MediaDocument;
}

export interface TextPost extends Post {
  textContent: TextContent;
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
  "REPOST",
  "UNREPOST",
] as const;
export type PostInteractionType = (typeof postInteractionValue)[number];

const userInteractionValue = ["FOLLOW", "UNFOLLOW", "BLOCK"] as const;
export type UserInteractionType = (typeof userInteractionValue)[number];

export interface PostInteraction {
  postId: string;
  targetId?: string;
}

export interface UserDetails {
  userId: string;
  name: string;
  image: string;
  username: string;
  job?: string;
}

export interface UserNode {
  blockedUsers: InteractionRelationship<UserDetails>[];
  likedPosts: InteractionRelationship<PostNode>[];
  repostedPosts: InteractionRelationship<PostNode>[];
  savedPosts: InteractionRelationship<PostNode>[];
  following: InteractionRelationship<UserDetails>[];
  followers: InteractionRelationship<UserDetails>[];
}

export interface UserConnection extends InteractionRelationship<UserDetails> {
  relationshipType: "FOLLOWER" | "FOLLOWING";
  mutual: UserDetails[];
}

export interface UserNetwork {
  user: UserDetails;
  following: UserConnection[];
  followers: UserConnection[];
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

export interface InteractionRelationship<T> {
  timestamp: Date;
  root: T;
}

export interface CreationRelationship<T> {
  createdAt: Date;
  root: T;
}

export interface ShareRelationship<T> {
  timestamp: Date;
  root: T;
  target: UserNode;
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
  postId: string;
}

export interface UserFeed {
  key: UserFeedKey;
  readStatus: boolean;
  postType: number;
  groupId: string;
}

export interface OriginReferenceKey {
  originatorUserId: string;
  postId: string;
  postReferenceType: number;
  userId: string;
}

export interface OriginReferenceLookup {
  key: OriginReferenceKey;
  isActive: boolean;
  referenceDate: Date;
}

export interface FeedDisplayReference {
  userFeed: UserFeed;
  recipientReferences: OriginReferenceLookup[];
}

interface FeedUsers {
  creator: UserDetails;
  users: List<UserDetails>;
}

export interface FeedPost extends FeedDisplayReference {
  postType: PostType;
  post: MediaPost | TextPost;
  users: FeedUsers;
}
