"use client";

import { GetFeedPosts } from "@/controllers/FeedController";
import { ChildNodeProps } from "@/lib/interfaces/componentTypes";
import { FeedDisplayReference, FeedPost } from "@/lib/interfaces/feedTypes";
import { Post } from "@/lib/interfaces/postTypes";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import {
  FeedProviderState,
  userFeedInitialState,
} from "./UserFeedInitialState";

export const UserFeedContext =
  createContext<FeedProviderState>(userFeedInitialState);

export const UserFeedProvider: React.FC<ChildNodeProps> = ({ children }) => {
  const { data } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [feedReferences, setFeedReferences] = useState<FeedDisplayReference[]>(
    []
  );
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);

  const [postOffset, setPostOffset] = useState<number>(1);
  const POST_LIMIT = 10;

  const loadMorePosts = async () => {
    if (!data?.token) return;

    const posts = await GetFeedPosts(
      feedReferences.slice(
        postOffset * POST_LIMIT,
        postOffset * POST_LIMIT + POST_LIMIT
      ),
      data?.token
    );

    if (!posts) {
      console.error("Failed to fetch feed posts");
      toast.error(
        "We are having trouble fetching your feed posts, please try again later"
      );
      return;
    }

    setFeedPosts((prev) => [...prev, ...posts]);
    setPostOffset((prev) => prev + 1);
  };

  const onPostUpdate = (updatedPost: Post) => {
    const existingPostIndex = feedPosts.findIndex(
      (feedPost) => feedPost.post.id === updatedPost.id
    );
    if (existingPostIndex === -1) return;

    setFeedPosts((prev) => {
      return [
        ...prev.slice(0, existingPostIndex),
        {
          ...prev[existingPostIndex],
          post: {
            ...prev[existingPostIndex].post,
            ...updatedPost,
          },
        },
        ...prev.slice(existingPostIndex + 1),
      ];
    });
  };

  return (
    <UserFeedContext.Provider
      value={{
        feedReferences,
        feedPosts,
        loading,
        setFeedPosts,
        setFeedReferences,
        loadMorePosts,
        setLoading,
        onPostUpdate,
      }}
    >
      {children}
    </UserFeedContext.Provider>
  );
};

export const useUserFeed = () => {
  const context = useContext(UserFeedContext);
  if (!context) {
    throw new Error("useUserFeed must be used within a UserFeedProvider");
  }
  return context;
};
