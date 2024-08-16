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
  UserAccount,
} from "@/lib/interface";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount } from "./AccountProvider";
import { useUserInteractions } from "./UserInteractionsProvider";
import { useProfileViewer } from "./UserProfileProvider";

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

const postTypeMap: Record<
  PostType,
  keyof Pick<UserAccount, "textPosts" | "mediaPosts">
> = {
  MEDIA: "mediaPosts",
  TEXT: "textPosts",
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
  const { userNode, setLikedPosts, setSavedPosts } = useUserInteractions();
  const { setAccount, account } = useAccount();
  const { setFetchedAccount } = useProfileViewer();

  useEffect(() => {
    if (!account) return;
    const isOwnPost: boolean = account[postTypeMap[postType]].some(
      (post) => post.id === postId
    );

    /*
    Updating Post Metrics within local metric store
    */
    isOwnPost
      ? handleUserAccountMetricUpdate(postTypeMap[postType])
      : handleProfileViewMetricUpdate(postTypeMap[postType]);
  }, [metrics]);

  if (!userNode || !account) return;

  const likePost = async () => {
    const response = await LikePost({
      postId,
      userId: userNode.userId,
      postType,
    });

    if (!response) {
      toast.error("Failed to like post. Please try again.");
      return;
    }

    setLikedPosts((prev) => [...prev, { postId, timeStamp: new Date() }]);
    setMetrics((prev) => ({ ...prev, likeCount: prev.likeCount + 1 }));
  };

  const unlikePost = async () => {
    const response = await UnlikePost({
      postId,
      userId: userNode.userId,
      postType,
    });

    if (!response) {
      toast.error("Failed to unlike post. Please try again.");
      return;
    }

    setLikedPosts((prev) => prev.filter((post) => post.postId !== postId));
    setMetrics((prev) => ({ ...prev, likeCount: prev.likeCount - 1 }));
  };

  const savePost = async () => {
    const response = await SavePost({
      postId,
      userId: userNode.userId,
      postType,
    });

    if (!response) {
      toast.error("Failed to save post. Please try again.");
      return;
    }

    setSavedPosts((prev) => [...prev, { postId, timeStamp: new Date() }]);
    setMetrics((prev) => ({ ...prev, saveCount: prev.saveCount + 1 }));
  };

  const unsavePost = async () => {
    const response = await UnsavePost({
      postId,
      userId: userNode.userId,
      postType,
    });

    if (!response) {
      toast.error("Failed to unsave post. Please try again.");
      return;
    }

    setSavedPosts((prev) => prev.filter((post) => post.postId !== postId));
    setMetrics((prev) => ({ ...prev, saveCount: prev.saveCount - 1 }));
  };

  const addComment = (count: number) => {
    setMetrics((prev) => ({
      ...prev,
      commentCount: prev.commentCount + count,
    }));
  };

  const removeComment = (count: number) => {
    setMetrics((prev) => ({
      ...prev,
      commentCount: prev.commentCount - count,
    }));
  };

  function updatePostMetric(
    account: UserAccount,
    postType: keyof Pick<UserAccount, "textPosts" | "mediaPosts">
  ): UserAccount {
    const posts = account[postType];
    const postIndex = posts.findIndex((post) => post.id === postId);

    if (postIndex === -1) return account;
    posts[postIndex] = {
      ...posts[postIndex],
      metrics: metrics,
    };

    return account;
  }

  function handleProfileViewMetricUpdate(
    postType: keyof Pick<UserAccount, "textPosts" | "mediaPosts">
  ) {
    setFetchedAccount((prev) => {
      if (!prev) return prev;
      return updatePostMetric(prev, postType);
    });
  }

  function handleUserAccountMetricUpdate(
    postType: keyof Pick<UserAccount, "textPosts" | "mediaPosts">
  ) {
    setAccount((prev) => {
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
