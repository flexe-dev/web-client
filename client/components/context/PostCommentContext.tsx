"use client";

import { ChildNodeProps, Comment, CommentNode } from "@/lib/interface";
import { createContext, useContext, useState } from "react";

interface PostCommentState {
  comments: CommentNode[];
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
}

interface ContextProps extends ChildNodeProps {
  comments: CommentNode[];
  postID: string;
}

const initialState: PostCommentState = {
  comments: [],
  postID: "",
  addComment: () => {},
  deleteComment: () => {},
  likeComment: () => {},
  editComment: () => {},
};

export const PostCommentContext = createContext<PostCommentState>(initialState);

export const PostCommentProvider = ({
  children,
  comments: fetchedComments,
  postID,
}: ContextProps) => {
  const [comments, setComments] = useState<CommentNode[]>(fetchedComments);

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
        postID,
        addComment,
        deleteComment,
        likeComment,
        editComment,
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
