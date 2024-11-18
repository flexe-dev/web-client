import {
  CreationRelationship,
  InteractionRelationship,
} from "./interactionTypes";
import { UserDetails } from "./userTypes";

export interface CommentTree {
  tree: CreationRelationship<CommentNode>[];
  reactedComments: Map<string, CommentReaction>;
}

export type CommentStatus =
  | "PUBLIC"
  | "UPLOADING"
  | "FAILED_UPLOAD"
  | "HIDDEN_BY_CREATOR"
  | "HIDDEN_BY_VIOLATION"
  | "DELETED";

export type ReactionType = "LIKE" | "DISLIKE";

export interface CommentDetails {
  id: string;
  postId: string;
  userId: string | null;
  content: string;
  likeCount: number;
  dislikeCount: number;
  status: CommentStatus;
  dateUpdated?: Date;
}

export interface CommentNode extends CommentDetails {
  user: InteractionRelationship<UserDetails> | null;
  children: CreationRelationship<CommentNode>[];
}

export const reactionMetricMap: Record<
  ReactionType,
  "likeCount" | "dislikeCount"
> = {
  LIKE: "likeCount",
  DISLIKE: "dislikeCount",
};

export const reactionReversionMap: Record<
  ReactionType,
  "likeCount" | "dislikeCount"
> = {
  LIKE: "dislikeCount",
  DISLIKE: "likeCount",
};

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

export interface CommentLimitations {
  level: number;
  replies: number;
}

export type Comment = CreationRelationship<CommentNode>;

export type CommentTarget = LinkedComment | undefined;

export type UserCommentReactions = Map<string, CommentReaction>;

export interface LinkedComment extends Comment {
  path: CommentPath;
  previous: CommentIdentifier | null;
  isRoot: boolean;
}

export interface CommentIdentifier {
  id: string;
  status: CommentStatus;
}

export interface CommentPath {
  node: CommentIdentifier;
  next?: CommentPath;
}

