"use client";

import { GetUserPosts } from "@/controllers/PostController";
import { ChildNodeProps, Post, UserPosts } from "@/lib/interface";
import { onPostObjectUpdate } from "@/lib/util/utils";
import React, { createContext, useEffect, useState } from "react";
import { useAccountPost } from "../User/AccountPostProvider";
import { useProfileUserViewer } from "./ProfileViewUserProvider";

interface ProfileViewerProviderState {
  fetchedPosts?: UserPosts;
  loading: boolean;
  setFetchedPosts: React.Dispatch<React.SetStateAction<UserPosts | undefined>>;
  onPostUpdate: (post: Post) => void;
}

const initialState: ProfileViewerProviderState = {
  fetchedPosts: undefined,
  loading: true,
  setFetchedPosts: () => {},
  onPostUpdate: () => {},
};

export const ProfileViewerPostContext =
  createContext<ProfileViewerProviderState>(initialState);

export const ProfileViewerPostProvider: React.FC<ChildNodeProps> = ({
  children,
}) => {
  const { userPosts } = useAccountPost();
  const { isOwnProfile, fetchedUser } = useProfileUserViewer();
  const [fetchedPosts, setFetchedPosts] = useState<UserPosts | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfilePosts = async (userId: string) => {
    try {
      const posts = await GetUserPosts(userId);
      setFetchedPosts(posts);
      setLoading(false);
    } catch (error) {
      console.error("Error Fetching User Posts:", error);
    }
  };

  useEffect(() => {
    if (!fetchedUser) return;

    if (isOwnProfile && userPosts) {
      setFetchedPosts((prev) => (prev !== userPosts ? userPosts : prev)); // Avoid unnecessary state updates
      setLoading(false);
    } else {
      fetchProfilePosts(fetchedUser.user.id);
    }
  }, [fetchedUser, isOwnProfile, userPosts]); // Combine dependencies to reduce unnecessary re-renders

  return (
    <ProfileViewerPostContext.Provider
      value={{
        loading,
        fetchedPosts,
        setFetchedPosts,
        onPostUpdate: onPostObjectUpdate(setFetchedPosts, fetchedPosts),
      }}
    >
      {children}
    </ProfileViewerPostContext.Provider>
  );
};

export const useProfilePostViewer = () => {
  const context = React.useContext(ProfileViewerPostContext);
  if (context === undefined) {
    throw new Error(
      "useProfileViewer must be used within a ProfileViewerProvider"
    );
  }
  return context;
};
