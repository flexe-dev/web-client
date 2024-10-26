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
  const [metrics, setMetrics] = useState<PostMetrics>(post.metrics);
  const {
    userNode,
    likePost: addToUserLikedPosts,
    savePost: addToUserSavedPosts,
    repostPost: addToUserRepostedPosts,
    removeRepostedPost,
    removeLikedPost,
    removeSavedPost,
  } = useUserInteractions();

  const { id: postId, postType } = post;

  const { data } = useSession();

  const updatePostObject = (updatedMetrics: PostMetrics) => {
    if (!callback) return;

    console.log(metrics);

    const updatedPost: Post = {
      ...post,
      metrics,
    };

    callback(updatedPost);
  };

  const likePost = async () => {
    if (!userNode || !postId) return;

    const response = await LikePost(
      {
        postId,
      },
      data?.token
    );

    if (!response) {
      toast.error("Failed to like post. Please try again.");
      return;
    }

    addToUserLikedPosts(postId);
    setMetrics((prev) => {
      const updatedMetrics = { ...prev, likeCount: prev.likeCount + 1 };
      updatePostObject(updatedMetrics);
      return updatedMetrics;
    });
  };

  const unlikePost = async () => {
    if (!userNode || !postId) return;

    const response = await UnlikePost(
      {
        postId,
      },
      data?.token
    );

    if (!response) {
      toast.error("Failed to unlike post. Please try again.");
      return;
    }

    removeLikedPost(postId);
    setMetrics((prev) => {
      const updatedMetrics = { ...prev, likeCount: prev.likeCount - 1 };
      updatePostObject(updatedMetrics);
      return updatedMetrics;
    });
  };

  const repostPost = async () => {
    if (!userNode || !postId) return;

    const response = await RepostPost(
      {
        postId,
      },
      data?.token
    );

    if (!response) {
      toast.error("Failed to repost post. Please try again.");
      return;
    }

    addToUserRepostedPosts(postId);
    setMetrics((prev) => {
      const updatedMetrics = { ...prev, likeCount: prev.repostCount + 1 };
      updatePostObject(updatedMetrics);
      return updatedMetrics;
    });
  };

  const removeRepost = async () => {
    if (!userNode || !postId) return;

    const response = await RemoveRepost(
      {
        postId,
      },
      data?.token
    );

    if (!response) {
      toast.error("Failed to remove repost. Please try again.");
      return;
    }

    removeRepostedPost(postId);
    setMetrics((prev) => {
      const updatedMetrics = { ...prev, likeCount: prev.repostCount - 1 };
      updatePostObject(updatedMetrics);
      return updatedMetrics;
    });
  };

  const savePost = async () => {
    if (!userNode || !postId) return;

    const response = await SavePost(
      {
        postId,
      },
      data?.token
    );

    if (!response) {
      toast.error("Failed to save post. Please try again.");
      return;
    }

    addToUserSavedPosts(postId);
    setMetrics((prev) => {
      const updatedMetrics = { ...prev, likeCount: prev.saveCount + 1 };
      updatePostObject(updatedMetrics);
      return updatedMetrics;
    });
  };

  const unsavePost = async () => {
    if (!userNode || !postId) return;

    const response = await UnsavePost(
      {
        postId,
      },
      data?.token
    );

    if (!response) {
      toast.error("Failed to unsave post. Please try again.");
      return;
    }

    removeSavedPost(postId);
    setMetrics((prev) => {
      const updatedMetrics = { ...prev, likeCount: prev.saveCount + 1 };
      updatePostObject(updatedMetrics);
      return updatedMetrics;
    });
  };

  const addComment = (count: number) => {
    if (!userNode) return;

    setMetrics((prev) => {
      const updatedMetrics = { ...prev, likeCount: prev.commentCount + count };
      updatePostObject(updatedMetrics);
      return updatedMetrics;
    });
  };

  const removeComment = (count: number) => {
    if (!userNode) return;

    setMetrics((prev) => {
      const updatedMetrics = { ...prev, likeCount: prev.commentCount - count };
      updatePostObject(updatedMetrics);
      return updatedMetrics;
    });
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
