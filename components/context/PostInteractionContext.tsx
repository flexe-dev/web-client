"use client";

import {
  LikePost,
  SavePost,
  UnlikePost,
  UnsavePost,
} from "@/controllers/PostInteractionController";
import {
  ChildNodeProps,
  PostMetrics,
  PostType,
  postTypeMap,
  UserPosts,
} from "@/lib/interface";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccountPost } from "./AccountPostProvider";
import { useProfilePostViewer } from "./ProfileViewPostProvider";
import { useUserInteractions } from "./UserInteractionsProvider";

interface PostInteractionState {
  metrics: PostMetrics;
  postType: PostType;
  postId: string;
  likePost: () => void;
  unlikePost: () => void;
  savePost: () => void;
  unsavePost: () => void;
  addComment: (count: number) => void;
  removeComment: (count: number) => void;
}

interface ContextProps extends ChildNodeProps {
  postType: PostType;
  postId: string;
  postMetrics: PostMetrics;
}

const initialState: PostInteractionState = {
  metrics: {
    likeCount: 0,
    commentCount: 0,
    viewCount: 0,
    saveCount: 0,
  },
  postId: "",
  postType: "MEDIA",
  addComment: () => {},
  removeComment: () => {},
  likePost: () => {},
  unlikePost: () => {},
  savePost: () => {},
  unsavePost: () => {},
};

const PostInteractionContext =
  createContext<PostInteractionState>(initialState);

export const PostInteractionProvider = ({
  children,
  postType,
  postId,
  postMetrics,
}: ContextProps) => {
  const [metrics, setMetrics] = useState<PostMetrics>(postMetrics);
  const {
    userNode,
    likePost: addToUserLikedPosts,
    savePost: addToUserSavedPosts,
    removeLikedPost,
    removeSavedPost,
  } = useUserInteractions();

  const { data } = useSession();
  const { userPosts, setUserPosts } = useAccountPost();
  const { setFetchedPosts } = useProfilePostViewer();

  useEffect(() => {
    if (!userPosts) return;
    const isOwnPost: boolean = userPosts[postTypeMap[postType]].some(
      (post) => post.id === postId
    );

    /*
    Updating Post Metrics within local metric store
    */
    isOwnPost
      ? handleUserAccountMetricUpdate(postTypeMap[postType])
      : handleProfileViewMetricUpdate(postTypeMap[postType]);
  }, [metrics]);

  const likePost = async () => {
    if (!userNode) return;

    const response = await LikePost(
      {
        postId,
        postType,
      },
      data?.token
    );

    if (!response) {
      toast.error("Failed to like post. Please try again.");
      return;
    }

    addToUserLikedPosts(postId);
    setMetrics((prev) => ({ ...prev, likeCount: prev.likeCount + 1 }));
  };

  const unlikePost = async () => {
    if (!userNode) return;

    const response = await UnlikePost(
      {
        postId,
        postType,
      },
      data?.token
    );

    if (!response) {
      toast.error("Failed to unlike post. Please try again.");
      return;
    }

    removeLikedPost(postId);
    setMetrics((prev) => ({ ...prev, likeCount: prev.likeCount - 1 }));
  };

  const savePost = async () => {
    if (!userNode) return;

    const response = await SavePost(
      {
        postId,
        postType,
      },
      data?.token
    );

    if (!response) {
      toast.error("Failed to save post. Please try again.");
      return;
    }

    addToUserSavedPosts(postId);
    setMetrics((prev) => ({ ...prev, saveCount: prev.saveCount + 1 }));
  };

  const unsavePost = async () => {
    if (!userNode) return;

    const response = await UnsavePost(
      {
        postId,
        postType,
      },
      data?.token
    );

    if (!response) {
      toast.error("Failed to unsave post. Please try again.");
      return;
    }

    removeSavedPost(postId);
    setMetrics((prev) => ({ ...prev, saveCount: prev.saveCount - 1 }));
  };

  const addComment = (count: number) => {
    if (!userNode) return;

    setMetrics((prev) => ({
      ...prev,
      commentCount: prev.commentCount + count,
    }));
  };

  const removeComment = (count: number) => {
    if (!userNode) return;

    setMetrics((prev) => ({
      ...prev,
      commentCount: prev.commentCount - count,
    }));
  };

  function updatePostMetric(
    userPosts: UserPosts,
    postType: keyof UserPosts
  ): UserPosts {
    const posts = userPosts[postType];
    const postIndex = posts.findIndex((post) => post.id === postId);

    if (postIndex === -1) return userPosts;
    posts[postIndex] = {
      ...posts[postIndex],
      metrics: metrics,
    };

    return userPosts;
  }

  function handleProfileViewMetricUpdate(postType: keyof UserPosts) {
    setFetchedPosts((prev) => {
      if (!prev) return prev;
      return updatePostMetric(prev, postType);
    });
  }

  function handleUserAccountMetricUpdate(postType: keyof UserPosts) {
    setUserPosts((prev) => {
      if (!prev) return prev;
      return updatePostMetric(prev, postType);
    });
  }

  return (
    <PostInteractionContext.Provider
      value={{
        metrics,
        postType,
        postId,
        likePost,
        unlikePost,
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
