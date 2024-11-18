import {
  Comment,
  CommentDetails,
  CommentTarget,
  CommentTree,
  LinkedComment,
  ReactionType,
  SortCriteria,
  UserCommentReactions,
} from "@/lib/interfaces/commentTypes";
import { ChildNodeProps } from "@/lib/interfaces/componentTypes";
import { Post } from "@/lib/interfaces/postTypes";
import { UserDetails } from "@/lib/interfaces/userTypes";
import { DefaultPostObject } from "@/lib/util/postUtils";
import { Dispatch, SetStateAction } from "react";

export interface PostCommentProviderState {
  comments: Comment[];
  commentReactions: UserCommentReactions;
  replyTarget?: LinkedComment;
  editTarget?: LinkedComment;
  post: Post;
  sortType: SortCriteria;

  addComment: (comment: CommentDetails, user: UserDetails) => void;
  replyToComment(
    comment: CommentDetails,
    creator: UserDetails,
    target: LinkedComment
  ): void;
  handleCommentUploadRetry: (comment: LinkedComment) => void;
  deleteComment: (comment: LinkedComment) => void;
  editComment: (comment: LinkedComment) => void;
  handleCommentReaction: (
    comment: LinkedComment,
    reaction: ReactionType,
    user: UserDetails,
    reversion: boolean
  ) => void;
  removeReaction: (comment: LinkedComment) => void;
  reportComment: (comment: LinkedComment) => void;

  setReplyTarget: Dispatch<SetStateAction<CommentTarget>>;
  setEditTarget: Dispatch<SetStateAction<CommentTarget>>;
  setSortType: Dispatch<SetStateAction<SortCriteria>>;
}

export interface PostCommentContextProps extends ChildNodeProps {
  comments: CommentTree;
  post: Post;
}

export const postCommentInitialState: PostCommentProviderState = {
  comments: [],
  commentReactions: new Map(),
  post: DefaultPostObject,
  replyTarget: undefined,
  editTarget: undefined,
  sortType: "NEWEST",

  addComment: () => {},
  handleCommentUploadRetry: () => {},
  replyToComment: () => {},
  deleteComment: () => {},
  handleCommentReaction: () => {},
  removeReaction: () => {},
  editComment: () => {},
  reportComment: () => {},
  setReplyTarget: () => {},
  setEditTarget: () => {},
  setSortType: () => {},
};
