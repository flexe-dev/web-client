import { UserNode } from "./userTypes";

export type NodeMetric = "likes" | "dislikes";

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
