import {
  CreationRelationship,
  InteractionRelationship,
} from "./interactionTypes";
import { UserDetails } from "./userTypes";

export type CommentStatus =
  | "PUBLIC"
  | "HIDDEN_BY_CREATOR"
  | "HIDDEN_BY_VIOLATION"
  | "DELETED";

export type ReactionType = "LIKE" | "DISLIKE";

export interface CommentDetails {
  id: string;
  postId: string;
  userId: string;
  content: string;
  likeCount: number;
  dislikeCount: number;
  status: CommentStatus;
  dateUpdated: Date;
}

export interface CommentNode extends CommentDetails {
  user: InteractionRelationship<UserDetails>;
  children: Set<CreationRelationship<CommentNode>>;
}

export interface CommentReactionKey {
  postId: string;
  userId: string;
  commentId: string;
}

export interface CommentReaction {
  key: CommentReactionKey;
  reactionType: ReactionType;
}

export const sortTypes = ["NEWEST", "OLDEST", "TOP"] as const;
export type SortCriteria = (typeof sortTypes)[number];
