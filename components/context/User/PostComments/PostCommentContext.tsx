"use client";

import {
  AddComment,
  AddCommentReaction,
  DeleteComment,
  EditComment,
  RemoveCommentReaction,
  ReplyToComment,
} from "@/controllers/CommentController";
import {
  Comment,
  CommentDetails,
  CommentTarget,
  LinkedComment,
  reactionMetricMap,
  reactionReversionMap,
  ReactionType,
  SortCriteria,
  UserCommentReactions,
} from "@/lib/interfaces/commentTypes";
import { UserDetails } from "@/lib/interfaces/userTypes";
import {
  ConvertCommentDetails,
  CreateReactionObject,
  RemoveComment,
  traverseCommentTree,
  updateCommentStatus,
} from "@/lib/util/commentUtils";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { usePostMetrics } from "../PostInteractions/PostInteractionContext";
import {
  PostCommentContextProps,
  postCommentInitialState,
  PostCommentProviderState,
} from "./PostCommentState";

export const PostCommentContext = createContext<PostCommentProviderState>(
  postCommentInitialState
);

export const PostCommentProvider = ({
  children,
  comments: fetchedComments,
  post,
}: PostCommentContextProps) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>(fetchedComments.tree);
  const [postCommentReactions, setPostCommentReactions] =
    useState<UserCommentReactions>(
      new Map(Object.entries(fetchedComments.reactedComments))
    );

  const {
    addComment: metricsIncrementComment,
    removeComment: metricsDecrementComment,
  } = usePostMetrics();

  const [replyTarget, setReplyTarget] = useState<CommentTarget>();
  const [editTarget, setEditTarget] = useState<CommentTarget>();
  const [sortType, setSortType] = useState<SortCriteria>("NEWEST");

  //Only Sort on Component Mount or when user selects a new sort type
  //This is so comments aren't rearranged on every state change
  useEffect(() => {
    //Sort the comments
  }, [sortType]);

  const updateCommentTree = (
    node: Comment,
    index: number = 0,
    replacement?: Comment
  ) => {
    setComments((prev) => [
      ...prev.slice(0, index),
      replacement || node,
      ...prev.slice(index + 1),
    ]);
  };

  /** 
    Updates a root comment node in the tree with either an updated variant
    of the same node, or a replacement node

    @param {Comment} node The target node to update
    @param {Comment} [replacement] replacement node in the event that the node
    is of differing id, so a search is done with the original node
    but replaced with this node
  */
  const updateRootNodeInTree = (node: Comment, replacement?: Comment) => {
    const index = comments.findIndex((n) => (n.root.id = node.root.id));

    if (index === -1) return;

    updateCommentTree(node, index, replacement);
  };

  // Returns Comment with Additional Child Comment
  const addChildToComment = (node: Comment, child: Comment): Comment => {
    const index = comments.findIndex((n) => n.root.id === node.root.id);

    if (index === -1) return node;

    return {
      ...node,
      root: {
        ...node.root,
        children: [child, ...node.root.children],
      },
    };
  };

  /**
   * Returns comment with an updated version of a given child comment (specified by pre-existing id)
   *
   * @param {Comment} node: The target node to update
   * @param {Comment} child: The child node to update
   * @param {Comment} [replacement] The replacement node to update the child with, only if the replacement
   * and the original node possess different ids
   */
  const updateCommentChild = (
    node: Comment,
    child: Comment,
    replacement?: Comment
  ) => {
    const childIndex = node.root.children.findIndex(
      (n) => n.root.id === child.root.id
    );
    if (childIndex === -1) return node;

    return {
      ...node,
      root: {
        ...node.root,
        children: [
          ...node.root.children.slice(0, childIndex),
          replacement || child,
          ...node.root.children.slice(childIndex + 1),
        ],
      },
    };
  };

  /**
   * Creates and adds a new root comment to the Comment tree, and will
   * send a request to upload respective details to the backend
   * This function is only used for root comments, as replies are handled
   * through `replyToComment`
   *
   * @param {CommentDetails} comment: The comment to add
   * @param {UserDetails} creator: The creator details
   */
  const addComment = async (comment: CommentDetails, creator: UserDetails) => {
    //Add Comment to the tree
    const newNode: Comment = ConvertCommentDetails(
      comment,
      creator,
      "UPLOADING"
    );
    updateCommentTree(newNode);
    metricsIncrementComment(1);

    //Add Comment to the top of the tree
    const uploadedComment = await AddComment(comment, session?.token);

    //Handle failed upload
    if (!uploadedComment) {
      toast.error("Failed to add comment. Please try again");
      updateRootNodeInTree(updateCommentStatus(newNode, "FAILED_UPLOAD"));
      return;
    }

    //Update the tree with the new comment
    updateRootNodeInTree(newNode, uploadedComment);
    toast.success("Comment added successfully");
  };

  /** 
    Replies to an existing comment, either adding or creating a new branch of 
    comments below its parent

    @param {CommentDetails} comment: The reply to a comment 
    @param {UserDetails} creator: Creator details
    @param {LinkedComment} target: The target comment being replied to
  */
  const replyToComment = async (
    comment: CommentDetails,
    creator: UserDetails,
    target: LinkedComment
  ) => {
    if (target.root.status !== "PUBLIC") return;

    const newNode: Comment = ConvertCommentDetails(
      comment,
      creator,
      "UPLOADING"
    );

    //Add Comment to the tree
    UpdateTreeNodeWithCallback(target, (node) =>
      addChildToComment(node, newNode)
    );

    metricsIncrementComment(1);

    //Backend request
    const request = await ReplyToComment(
      comment,
      target.root.id,
      target.isRoot,
      session?.token
    );

    //Handle failed upload
    if (!request) {
      toast.error("Failed to reply to comment. Please try again");
      const updatedNode = updateCommentStatus(newNode, "FAILED_UPLOAD");
      UpdateTreeNodeWithCallback(target, (node) =>
        updateCommentChild(node, updatedNode)
      );
      return;
    }

    //Update the tree with the new comment
    const updatedNode = updateCommentStatus(newNode, "PUBLIC");
    UpdateTreeNodeWithCallback(target, (node) =>
      updateCommentChild(node, updatedNode, request)
    );
    toast.success("Replied to comment successfully");
  };

  /** 
    Updates a comment node with new content, will need to be expanded in the future to support additional functionality
    such as mentions and tags

    @param {LinkedComment} comment: The target node to update
  */
  const editComment = async (comment: LinkedComment) => {
    if (comment.root.status !== "PUBLIC") return;

    const request = await EditComment(comment.root, session?.token);

    if (!request) {
      toast.error("Failed to edit comment. Please try again");
      return;
    }

    setEditTarget(undefined);
    HandleCommentUpdateReplacement(comment, request);
  };

  /**
    Performs another request in an attempt to upload a comment that had previously failed

    @param {LinkedComment} comment: A comment that failed an upload, to repeat a request
  */
  const handleCommentUploadRetry = async (comment: LinkedComment) => {
    if (comment.root.status !== "FAILED_UPLOAD") return;

    if (comment.isRoot) {
      updateRootNodeInTree(updateCommentStatus(comment, "UPLOADING"));
      const request = await AddComment(comment.root, session?.token);

      if (!request) {
        toast.error("Failed to add comment. Please try again");
        updateRootNodeInTree(updateCommentStatus(comment, "FAILED_UPLOAD"));
        return;
      }

      updateRootNodeInTree(comment, request);
      return;
    }

    if (!comment.previous) return;

    UpdateTreeNodeWithCallback(comment, (node) => {
      return updateCommentStatus(node, "UPLOADING");
    });

    //Backend request
    const uploadedNode = await ReplyToComment(
      comment.root,
      comment.previous.id,
      false,
      session?.token
    );

    //Handle failed upload
    if (!uploadedNode) {
      toast.error("Failed to reply to comment. Please try again");
      UpdateTreeNodeWithCallback(comment, (node) => {
        return updateCommentStatus(node, "FAILED_UPLOAD");
      });
      return;
    }

    //Update the tree with the new comment
    UpdateTreeNodeWithCallback(comment, (_) => {
      return updateCommentStatus(uploadedNode, "PUBLIC");
    });

    toast.success("Replied to comment successfully");
  };

  const deleteComment = async (comment: LinkedComment) => {
    const request = await DeleteComment(comment.root, session?.token);

    if (!request) {
      toast.error("Failed to delete comment. Please try again");
      return;
    }

    metricsDecrementComment(1);
    HandleCommentUpdateCallback(comment, (node) => RemoveComment(node));
  };

  /**
    * Updates comments with a given reaction, adjust metrics based on reaction type, and adding reaction to the user's reaction list
    * for lookups and reversion

    * @param {LinkedComment} comment: The target node to update
    * @param {ReactionType} reaction: The type of reaction to add
    * @param {boolean} [reversion]: If the user previously had an opposite reaction, so metrics would be further adjusted
  */
  const handleCommentReaction = async (
    comment: LinkedComment,
    reaction: ReactionType,
    user: UserDetails,
    reversion: boolean = false
  ) => {
    const request = AddCommentReaction(comment.root, reaction, session?.token);

    if (!request) {
      toast.error("Failed to add reaction. Please try again");
      return;
    }

    // Add to users liked comments for this post
    setPostCommentReactions((prev) => {
      return new Map(
        prev.set(
          comment.root.id,
          CreateReactionObject(comment.root, reaction, user)
        )
      );
    });

    const updatedComment: LinkedComment = {
      ...comment,
      root: {
        ...comment.root,
        [reactionMetricMap[reaction]]:
          comment.root[reactionMetricMap[reaction]] + 1,
        [reactionReversionMap[reaction]]:
          comment.root[reactionReversionMap[reaction]] - (reversion ? 1 : 0),
      },
    };

    HandleCommentUpdateReplacement(comment, updatedComment);
  };

  const removeReaction = async (comment: LinkedComment) => {
    const existingReaction = postCommentReactions.get(comment.root.id);
    if (!existingReaction) return;

    const request = RemoveCommentReaction(comment.root, session?.token);

    if (!request) {
      toast.error("Failed to remove reaction. Please try again");
      return;
    }

    // Remove from users liked comments for this post
    setPostCommentReactions((prev) => {
      prev.delete(comment.root.id);
      return new Map(prev);
    });

    const updatedComment: LinkedComment = {
      ...comment,
      root: {
        ...comment.root,
        [reactionMetricMap[existingReaction.reactionType]]:
          comment.root[reactionMetricMap[existingReaction.reactionType]] - 1,
      },
    };

    HandleCommentUpdateReplacement(comment, updatedComment);
  };

  const reportComment = async (comment: LinkedComment) => {};

  /**
    This will update a node within a comment with a given replacement,
    This utilises the Tree navigation function for non root nodes,
    and will update the root node directly if the target node is the root

    @param {LinkedComment} originalComment: The target node to update
    @param {Comment} updatedComment: The replacement node
  */
  const HandleCommentUpdateReplacement = (
    originalComment: LinkedComment,
    updatedComment: Comment
  ) => {
    if (originalComment.isRoot) {
      updateRootNodeInTree(originalComment, updatedComment);
      return;
    }

    UpdateTreeNodeWithCallback(originalComment, (_) => {
      return updatedComment;
    });
  };

  /** 
      This will update a node within a comment tree with a given callback,
      This utilises the Tree navigation function for non root nodes,
      and will update the root node directly if the target node is the root

      @param {LinkedComment} comment: The target node to update
      @param {Function} fn: The callback to update the node with
  */
  const HandleCommentUpdateCallback = (
    comment: LinkedComment,
    fn: (comment: Comment) => Comment
  ) => {
    if (comment.isRoot) {
      updateRootNodeInTree(fn(comment));
      return;
    }

    UpdateTreeNodeWithCallback(comment, (node) => {
      return fn(node);
    });
  };

  /**
    This will update a given node branch with a calback by accessing the node's
    parents, traversing its path to the target node, and updating through a
    given callback

    @param {LinkedComment} comment: The target node to update
    @param {Function} fn: The callback to update the node with
  */
  const UpdateTreeNodeWithCallback = (
    comment: LinkedComment,
    fn: (comment: Comment) => Comment
  ): void => {
    if (!comment.path) return;

    const rootIndex = comments.findIndex(
      (n) => n.root.id === comment.path.node.id
    );
    if (rootIndex === -1) return;

    const tr: Comment = traverseCommentTree(
      comment,
      comments[rootIndex],
      comment.path,
      fn
    );

    setComments((prev) => {
      return [...prev.slice(0, rootIndex), tr, ...prev.slice(rootIndex + 1)];
    });
  };

  return (
    <PostCommentContext.Provider
      value={{
        comments,
        post,
        commentReactions: postCommentReactions,
        replyTarget,
        editTarget,
        sortType,
        addComment,
        replyToComment,
        handleCommentUploadRetry,
        deleteComment,
        editComment,
        handleCommentReaction,
        removeReaction,
        reportComment,
        setReplyTarget,
        setEditTarget,
        setSortType,
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
