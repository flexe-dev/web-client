"use client";

import { AddComment, DeleteComment } from "@/controllers/PostController";
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

  addComment: (comment: CommentNode, rootNode?: CommentNode) => void;

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

  const addComment = async (comment: CommentNode, rootNode?: CommentNode) => {
    const newNode = await AddComment(comment.comment);
    if (!newNode) return;

    if (!rootNode || !replyTarget) {
      setComments([...comments, { ...newNode, user: comment.user }]);
      return;
    }

    //Find Index of rootNode
    const index = comments.findIndex(
      (node) => node.comment.id === rootNode.comment.id
    );
    console.log(index);
    if (index === -1) return;

    const tr = traverseNodeTree(rootNode, replyTarget.comment, (node) => {
      return {
        ...node,
        children: [...node.children, { ...newNode, user: comment.user }],
      };
    });

    console.log(tr);

    setComments([
      ...comments.slice(0, index),
      tr,
      ...comments.slice(index + 1),
    ]);
    setReplyTarget(undefined);
  };

  const deleteComment = async (
    comment: CommentNode,
    rootNode?: CommentNode
  ) => {
    const response = await DeleteComment(comment);
    if (!response) return;

    if (!rootNode || !replyTarget) {
      setComments(
        comments.filter((node) => node.comment.id !== comment.comment.id)
      );
      return;
    }

    const index = comments.findIndex(
      (node) => node.comment.id === rootNode.comment.id
    );
    if (index === -1) return;
    console.log(index);

    const tr = traverseNodeTree(
      comments[index],
      replyTarget.comment,
      (node) => {
        return {
          ...node,
          children: node.children.filter(
            (child) => child.comment.id !== comment.comment.id
          ),
        };
      }
    );
  };

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

const traverseNodeTree = (
  node: CommentNode,
  targetNode: Comment,
  fn: (node: CommentNode) => CommentNode
) => {
  if (node.comment.id === targetNode.id) {
    return fn(node);
  }

  const newNode: CommentNode = {
    ...node,
    children: node.children.map((child) => {
      return traverseNodeTree(child, targetNode, fn);
    }),
  };

  return newNode;
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
