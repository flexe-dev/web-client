"use client";

import {
  AddComment,
  DeleteComment,
  LikeComment,
} from "@/controllers/PostController";
import { ChildNodeProps, Comment, CommentNode, Reply } from "@/lib/interface";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { toast } from "sonner";

interface PostCommentState {
  comments: CommentNode[];
  replyTarget?: Reply;
  editTarget?: CommentNode;
  postID: string;

  addComment: (comment: CommentNode, rootNode?: CommentNode) => void;
  deleteComment: (comment: CommentNode, rootNode?: CommentNode) => void;
  likeComment: (comment: CommentNode, rootNode?: CommentNode) => void;
  editComment: (comment: CommentNode, rootNode?: CommentNode) => void;
  reportComment: (comment: CommentNode) => void;

  setReplyTarget: Dispatch<SetStateAction<Reply | undefined>>;
  setEditTarget: Dispatch<SetStateAction<CommentNode | undefined>>;
}

interface ContextProps extends ChildNodeProps {
  comments: CommentNode[];
  postID: string;
}

const initialState: PostCommentState = {
  comments: [],
  postID: "",
  replyTarget: undefined,
  editTarget: undefined,
  addComment: () => {},
  deleteComment: () => {},
  likeComment: () => {},
  editComment: () => {},
  reportComment: () => {},
  setReplyTarget: () => {},
  setEditTarget: () => {},
};

export const PostCommentContext = createContext<PostCommentState>(initialState);

export const PostCommentProvider = ({
  children,
  comments: fetchedComments,
  postID,
}: ContextProps) => {
  const [comments, setComments] = useState<CommentNode[]>(fetchedComments);
  const [replyTarget, setReplyTarget] = useState<Reply | undefined>();
  const [editTarget, setEditTarget] = useState<CommentNode | undefined>();

  const addComment = async (comment: CommentNode, rootNode?: CommentNode) => {
    const uploadedComment = await AddComment(comment.comment);
    if (!uploadedComment) return;

    const newNode: CommentNode = {
      ...comment,
      comment: uploadedComment,
    };

    if (!rootNode || !replyTarget) {
      setComments([...comments, newNode]);
      return;
    }

    //Find Index of rootNode
    const index = comments.findIndex(
      (node) => node.comment.id === rootNode.comment.id
    );

    if (index === -1) return;

    const tr = traverseNodeTree(rootNode, replyTarget.comment, (node) => {
      return {
        ...node,
        children: [...node.children, newNode],
      };
    });

    if (!tr) return;
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
    if (!response) {
      toast.error("Failed to delete comment");
      return;
    }

    if (!rootNode) return;

    if (rootNode?.comment.id === comment.comment.id) {
      setComments(
        comments.filter((node) => node.comment.id !== comment.comment.id)
      );
      toast.success("Comment deleted successfully");
      return;
    }

    const index = comments.findIndex(
      (node) => node.comment.id === rootNode.comment.id
    );

    if (index === -1) return;

    const tr = traverseNodeTree(rootNode, comment.comment, (node) => {
      return null;
    });

    if (!tr) return;

    setComments([
      ...comments.slice(0, index),
      tr,
      ...comments.slice(index + 1),
    ]);

    toast.success("Comment deleted successfully");
  };

  const likeComment = (comment: CommentNode, rootNode?: CommentNode) => {
    const response = LikeComment(comment.comment.id);
    if (!response) {
      toast.error("Failed to like comment");
      return;
    }

    if (!rootNode) return;

    const index = comments.findIndex(
      (node) => node.comment.id === rootNode.comment.id
    );

    if (index === -1) return;

    if (rootNode.comment.id === comment.comment.id) {
      const tr = {
        ...rootNode,
        comment: {
          ...rootNode.comment,
          likes: rootNode.comment.likes + 1,
        },
      };
      setComments([
        ...comments.slice(0, index),
        tr,
        ...comments.slice(index + 1),
      ]);
      return;
    }

    const tr = traverseNodeTree(rootNode, comment.comment, (node) => {
      return {
        ...node,
        comment: {
          ...node.comment,
          likes: node.comment.likes + 1,
        },
      };
    });

    if (!tr) return;

    setComments([
      ...comments.slice(0, index),
      tr,
      ...comments.slice(index + 1),
    ]);
  };

  const editComment = (comment: CommentNode, rootNode?: CommentNode) => {};

  const reportComment = (comment: CommentNode) => {};

  return (
    <PostCommentContext.Provider
      value={{
        comments,
        postID,
        replyTarget,
        editTarget,
        addComment,
        deleteComment,
        likeComment,
        editComment,
        reportComment,
        setReplyTarget,
        setEditTarget,
      }}
    >
      {children}
    </PostCommentContext.Provider>
  );
};

const traverseNodeTree = (
  node: CommentNode,
  targetNode: Comment,
  fn: (node: CommentNode) => CommentNode | null
) => {
  if (node.comment.id === targetNode.id) {
    return fn(node);
  }

  const newNode: CommentNode = {
    ...node,
    children: node.children
      .map((child) => {
        return traverseNodeTree(child, targetNode, fn);
      })
      .filter((node) => !!node),
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
