"use client";

import { defaultPostMetrics } from "@/controllers/PostController";
import {
  LikePost,
  RemoveRepost,
  RepostPost,
  SavePost,
  UnlikePost,
  UnsavePost,
} from "@/controllers/PostInteractionController";
import { ChildNodeProps, Post, PostMetrics } from "@/lib/interface";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { useUserInteractions } from "../UserInteraction/UserInteractionsProvider";

interface PostInteractionState {
  metrics: PostMetrics;
  postId: string;
  likePost: () => void;
  unlikePost: () => void;
  repostPost: () => void;
  removeRepost: () => void;
  savePost: () => void;
  unsavePost: () => void;
  addComment: (count: number) => void;
  removeComment: (count: number) => void;
}

interface ContextProps extends ChildNodeProps {
  post: Post;
  callback?: (post: Post) => void;
}

const initialState: PostInteractionState = {
  metrics: defaultPostMetrics,
  postId: "",
  addComment: () => {},
  removeComment: () => {},
  likePost: () => {},
  unlikePost: () => {},
  repostPost: () => {},
  removeRepost: () => {},
  savePost: () => {},
  unsavePost: () => {},
};

const PostInteractionContext =
  createContext<PostInteractionState>(initialState);

export const PostInteractionProvider = ({
  children,
  post,
  callback,
}: ContextProps) => {
  const {
    userNode,
    likePost: addToUserLikedPosts,
    savePost: addToUserSavedPosts,
    repostPost: addToUserRepostedPosts,
    removeRepostedPost,
    removeLikedPost,
    removeSavedPost,
  } = useUserInteractions();

  const { id: postId, metrics } = post;

  // Use for Isolated Server Side Components
  const [postMetrics, setMetrics] = useState<PostMetrics>(post.metrics);
  const { data } = useSession();

  const updatePostObject = (key: keyof PostMetrics, adjustment: number) => {
    if (!post) return;

    if (!callback) {
      setMetrics((prev) => ({ ...prev, [key]: prev[key] + adjustment }));
      return;
    }

    const updatedMetrics: PostMetrics = {
      ...metrics,
      [key]: metrics[key] + adjustment,
    };
    callback({ ...post, metrics: updatedMetrics });
  };

  const likePost = async () => {
    if (!userNode || !postId) return;
    addToUserLikedPosts(postId);
    updatePostObject("likeCount", 1);

    const response = await LikePost(
      {
        postId,
      },
      data?.token
    );

    if (!response) {
      // Revert Changes
      removeLikedPost(postId);
      updatePostObject("likeCount", -1);
      toast.error("Failed to like post. Please try again.");
      return;
    }
  };

  const unlikePost = async () => {
    if (!userNode || !postId) return;
    removeLikedPost(postId);
    updatePostObject("likeCount", -1);

    const response = await UnlikePost(
      {
        postId,
      },
      data?.token
    );

    if (!response) {
      // Revert Changes
      addToUserLikedPosts(postId);
      updatePostObject("likeCount", 1);
      toast.error("Failed to unlike post. Please try again.");
      return;
    }
  };

  const repostPost = async () => {
    if (!userNode || !postId) return;

    addToUserRepostedPosts(postId);
    updatePostObject("repostCount", 1);

    //Contact Server
    const response = await RepostPost(
      {
        postId,
      },
      data?.token
    );

    if (!response) {
      // Revert Changes
      removeRepostedPost(postId);
      updatePostObject("repostCount", -1);
      toast.error("Failed to repost post. Please try again.");
      return;
    }
  };

  const removeRepost = async () => {
    if (!userNode || !postId) return;
    removeRepostedPost(postId);
    updatePostObject("repostCount", -1);

    const response = await RemoveRepost(
      {
        postId,
      },
      data?.token
    );

    if (!response) {
      addToUserRepostedPosts(postId);
      updatePostObject("repostCount", 1);
      toast.error("Failed to remove repost. Please try again.");
      return;
    }
  };

  const savePost = async () => {
    if (!userNode || !postId) return;

    addToUserSavedPosts(postId);
    updatePostObject("saveCount", 1);

    const response = await SavePost(
      {
        postId,
      },
      data?.token
    );

    if (!response) {
      // Revert Changes
      removeSavedPost(postId);
      updatePostObject("saveCount", -1);
      toast.error("Failed to save post. Please try again.");
      return;
    }
  };

  const unsavePost = async () => {
    if (!userNode || !postId) return;

    removeSavedPost(postId);
    updatePostObject("saveCount", -1);

    const response = await UnsavePost(
      {
        postId,
      },
      data?.token
    );

    if (!response) {
      // Revert Changes
      addToUserSavedPosts(postId);
      updatePostObject("saveCount", 1);
      toast.error("Failed to unsave post. Please try again.");
      return;
    }
  };

  const addComment = (count: number) => {
    if (!userNode) return;
    updatePostObject("commentCount", count);
  };

  const removeComment = (count: number) => {
    if (!userNode) return;
    updatePostObject("commentCount", -count);
  };

  return (
    <PostInteractionContext.Provider
      value={{
        metrics,
        postId: post.id!,
        likePost,
        unlikePost,
        repostPost,
        removeRepost,
        savePost,
        unsavePost,
        addComment,
        removeComment,
      }}
    >
      {children}
    </PostInteractionContext.Provider>
  );
};

export const usePostMetrics = () => {
  const context = useContext(PostInteractionContext);
  if (!context) {
    throw new Error(
      "usePostMetrics must be used within a PostInteractionProvider"
    );
  }
  return context;
};
