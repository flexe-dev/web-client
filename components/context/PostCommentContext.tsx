"use client";

import {
  AddComment,
  DeleteComment,
  DislikeComment,
  EditComment,
  GetPostReactions,
  LikeComment,
  RemoveCommentReaction,
} from "@/controllers/PostController";
import { CommentSortAlgorithm } from "@/lib/commentUtils";
import {
  ChildNodeProps,
  Comment,
  CommentNode,
  CommentReactType,
  NodeMetric,
  PostType,
  Reply,
  SortCriteria,
  UserPostReactions,
} from "@/lib/interface";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useAccount } from "./AccountProvider";

interface PostCommentState {
  comments: CommentNode[];
  commentReactions: UserPostReactions;
  replyTarget?: Reply;
  editTarget?: EditCommentTarget;
  postID: string;
  type: PostType;
  sortType: SortCriteria;

  addComment: (comment: CommentNode, rootNode?: CommentNode) => void;
  deleteComment: (comment: CommentNode, rootNode: CommentNode) => void;
  likeComment: (
    comment: CommentNode,
    rootNode: CommentNode,
    opposite: boolean
  ) => void;
  dislikeComment: (
    comment: CommentNode,
    rootNode: CommentNode,
    opposite: boolean
  ) => void;
  editComment: (comment: CommentNode, rootNode: CommentNode) => void;
  removeReaction: (comment: CommentNode, rootNode: CommentNode) => void;
  reportComment: (comment: CommentNode) => void;

  setReplyTarget: Dispatch<SetStateAction<Reply | undefined>>;
  setEditTarget: Dispatch<SetStateAction<EditCommentTarget | undefined>>;
  setSortType: Dispatch<SetStateAction<SortCriteria>>;
}

interface ContextProps extends ChildNodeProps {
  comments: CommentNode[];
  postID: string;
  type: PostType;
}

interface EditCommentTarget {
  node: CommentNode;
  root: CommentNode;
}

const initialState: PostCommentState = {
  comments: [],
  postID: "",
  replyTarget: undefined,
  editTarget: undefined,
  addComment: () => {},
  deleteComment: () => {},
  likeComment: () => {},
  dislikeComment: () => {},
  removeReaction: () => {},
  editComment: () => {},
  reportComment: () => {},
  setReplyTarget: () => {},
  setEditTarget: () => {},
  setSortType: () => {},
  type: "MEDIA",
  sortType: "NEWEST",
  commentReactions: {
    reactions: new Map<string, CommentReactType>(),
    loading: true,
  },
};

export const PostCommentContext = createContext<PostCommentState>(initialState);

export const PostCommentProvider = ({
  children,
  comments: fetchedComments,
  postID,
  type,
}: ContextProps) => {
  const [comments, setComments] = useState<CommentNode[]>(fetchedComments);
  const { account } = useAccount();
  const [replyTarget, setReplyTarget] = useState<Reply | undefined>();
  const [editTarget, setEditTarget] = useState<EditCommentTarget | undefined>();
  const [commentReactions, setCommentReactions] = useState<UserPostReactions>({
    reactions: new Map<string, CommentReactType>(),
    loading: true,
  });
  const [sortType, setSortType] = useState<SortCriteria>("NEWEST");

  //Only Sort on Component Mount or when user selects a new sort type
  //This is so comments aren't rearranged on every state change
  useEffect(() => {
    console.log("Sorting");
    setComments((prev) =>
      [...prev].sort((a, b) => CommentSortAlgorithm[sortType](a, b))
    );
  }, [sortType]);

  useEffect(() => {
    if (!account) return;

    const fetchUserReactions = async () => {
      const reactions = await GetPostReactions(postID, account.user.id);
      if (!reactions) return;
      setCommentReactions({
        reactions: new Map(Object.entries(reactions)),
        loading: false,
      });
    };

    fetchUserReactions();
  }, [account]);

  const updateCommentTree = (node: CommentNode, index: number) => {
    setComments([
      ...comments.slice(0, index),
      node,
      ...comments.slice(index + 1),
    ]);
  };

  const addComment = async (comment: CommentNode, rootNode?: CommentNode) => {
    const uploadedComment = await AddComment(comment.comment);
    if (!uploadedComment) return;

    const newNode: CommentNode = {
      ...comment,
      comment: uploadedComment,
    };

    if (!replyTarget || !rootNode) {
      setComments([newNode, ...comments]);
      toast.success("Comment added successfully");
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
    updateCommentTree(tr, index);
    toast.success("Comment added successfully");
    setReplyTarget(undefined);
  };

  const deleteComment = async (comment: CommentNode, rootNode: CommentNode) => {
    const response = await DeleteComment(comment);
    if (!response) {
      toast.error("Failed to delete comment");
      return;
    }

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
    updateCommentTree(tr, index);
    toast.success("Comment deleted successfully");
  };

  const likeComment = async (
    comment: CommentNode,
    rootNode: CommentNode,
    opposite: boolean
  ) => {
    if (!account) return;
    const response = await LikeComment(
      comment.comment.id,
      account?.user.id,
      postID,
      opposite
    );

    if (!response) {
      toast.error("Failed to like comment");
      return;
    }

    //Increment the like counter on the node
    if (!rootNode) return;
    updateCommentMetrics(comment, rootNode, "likes", opposite);
    //Add to the Reaction Map
    addReaction(comment.comment.id, "LIKE");
  };

  const dislikeComment = async (
    comment: CommentNode,
    rootNode: CommentNode,
    opposite: boolean
  ) => {
    if (!account) return;
    const response = await DislikeComment(
      comment.comment.id,
      account?.user.id,
      postID,
      opposite
    );

    if (!response) {
      toast.error("Failed to dislike comment");
      return;
    }

    //Increment the like counter on the node
    if (!rootNode) return;
    updateCommentMetrics(comment, rootNode, "dislikes", opposite);
    //Add to the Reaction Map
    addReaction(comment.comment.id, "DISLIKE");
  };

  const oppositeMetric: Record<NodeMetric, NodeMetric> = {
    likes: "dislikes",
    dislikes: "likes",
  };

  const updateCommentMetrics = (
    node: CommentNode,
    root: CommentNode,
    metric: NodeMetric,
    opposite: boolean,
    increment: boolean = true
  ) => {
    const index = comments.findIndex(
      (node) => node.comment.id === root.comment.id
    );

    if (index === -1) return;

    if (root.comment.id === node.comment.id) {
      updateCommentTree(
        {
          ...node,
          comment: {
            ...node.comment,
            [metric]: node.comment[metric] + (increment ? 1 : -1),
            [oppositeMetric[metric]]:
              node.comment[oppositeMetric[metric]] - (opposite ? 1 : 0),
          },
        },
        index
      );
      return;
    }

    const tr = traverseNodeTree(root, node.comment, (node) => {
      return {
        ...node,
        comment: {
          ...node.comment,
          [metric]: node.comment[metric] + (increment ? 1 : -1),
          [oppositeMetric[metric]]:
            node.comment[oppositeMetric[metric]] - (opposite ? 1 : 0),
        },
      };
    });

    if (!tr) return;

    updateCommentTree(tr, index);
  };

  const editComment = async (comment: CommentNode, rootNode: CommentNode) => {
    const response = await EditComment(comment.comment);
    if (!response) {
      toast.error("Failed to edit comment");
      return;
    }

    const index = comments.findIndex(
      (node) => node.comment.id === rootNode.comment.id
    );

    if (index === -1) return;

    if (rootNode.comment.id === comment.comment.id) {
      updateCommentTree(comment, index);
      return;
    }

    const tr = traverseNodeTree(rootNode, comment.comment, (node) => {
      return {
        ...node,
        comment: comment.comment,
      };
    });

    if (!tr) return;

    updateCommentTree(tr, index);
  };

  const addReaction = (commentId: string, reaction: CommentReactType) => {
    const newReactions = new Map(commentReactions.reactions);
    newReactions.set(commentId, reaction);
    setCommentReactions((prev) => ({
      ...prev,
      reactions: newReactions,
    }));
  };

  const removeReaction = async (comment: CommentNode, root?: CommentNode) => {
    if (!account) return;
    const response = await RemoveCommentReaction(
      comment.comment.id,
      account.user.id
    );
    if (!response) return;
    const reaction = commentReactions.reactions.get(comment.comment.id);
    if (!root || !reaction) return;

    const newReactions = new Map(commentReactions.reactions);
    newReactions.delete(comment.comment.id);
    setCommentReactions((prev) => ({
      ...prev,
      reactions: newReactions,
    }));

    updateCommentMetrics(
      comment,
      root,
      reaction === "LIKE" ? "likes" : "dislikes",
      false,
      false
    );
  };

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
        dislikeComment,
        removeReaction,
        editComment,
        reportComment,
        setReplyTarget,
        setEditTarget,
        commentReactions,
        sortType,
        setSortType,
        type,
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
