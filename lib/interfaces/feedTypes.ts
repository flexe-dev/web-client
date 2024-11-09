import { PostType, MediaPost, TextPost } from "./postTypes";
import { UserDetails } from "./userTypes";

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
  users: UserDetails[];
}

export interface FeedPost extends FeedDisplayReference {
  postType: PostType;
  post: MediaPost | TextPost;
  users: FeedUsers;
}
