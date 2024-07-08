"use client";

import { ChildNodeProps, Comment, CommentNode, Reply } from "@/lib/interface";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface PostCommentState {
  comments: CommentNode[];
  replyTarget?: Reply;
  postID: string;
  addComment: (
    comment: Comment,
    rootNode?: CommentNode,
    depth?: number
  ) => void;
  deleteComment: (
    comment: CommentNode,
    rootNode?: CommentNode,
    depth?: number
  ) => void;
  likeComment: (
    comment: CommentNode,
    rootNode?: CommentNode,
    depth?: number
  ) => void;
  editComment: (
    comment: CommentNode,
    rootNode?: CommentNode,
    depth?: number
  ) => void;
  setReplyTarget: Dispatch<SetStateAction<Reply | undefined>>;
}

interface ContextProps extends ChildNodeProps {
  comments: CommentNode[];
  postID: string;
}

const initialState: PostCommentState = {
  comments: [],
  postID: "",
  replyTarget: undefined,
  addComment: () => {},
  deleteComment: () => {},
  likeComment: () => {},
  editComment: () => {},
  setReplyTarget: () => {},
};

export const PostCommentContext = createContext<PostCommentState>(initialState);

export const PostCommentProvider = ({
  children,
  comments: fetchedComments,
  postID,
}: ContextProps) => {
  const [comments, setComments] = useState<CommentNode[]>(fetchedComments);
  const [replyTarget, setReplyTarget] = useState<Reply | undefined>();

  const addComment = (
    comment: Comment,
    rootNode?: CommentNode,
    depth?: number
  ) => {};

  const deleteComment = (
    comment: CommentNode,
    rootNode?: CommentNode,
    depth?: number
  ) => {};

  const likeComment = (
    comment: CommentNode,
    rootNode?: CommentNode,
    depth?: number
  ) => {};

  const editComment = (
    comment: CommentNode,
    rootNode?: CommentNode,
    depth?: number
  ) => {};

  return (
    <PostCommentContext.Provider
      value={{
        comments,
        replyTarget,
        postID,
        addComment,
        deleteComment,
        likeComment,
        editComment,
        setReplyTarget,
      }}
    >
      {children}
    </PostCommentContext.Provider>
  );
};

export const usePostComments = () => {
  const context = useContext(PostCommentContext);
  if (!context) {
    throw new Error(
      "usePostComments must be used within a PostCommentProvider"
    );
  }
  return context;
};
