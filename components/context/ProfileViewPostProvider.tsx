"use client";

import { GetUserPosts } from "@/controllers/PostController";
import { ChildNodeProps, UserPosts } from "@/lib/interface";
import React, { createContext, useEffect, useState } from "react";
import { useAccountPost } from "./AccountPostProvider";
import { useProfileUserViewer } from "./ProfileViewUserProvider";

interface ProfileViewerProviderState {
  fetchedPosts?: UserPosts;
  loading: boolean;
  setFetchedPosts: React.Dispatch<React.SetStateAction<UserPosts | undefined>>;
}

const initialState: ProfileViewerProviderState = {
  fetchedPosts: undefined,
  loading: true,
  setFetchedPosts: () => {},
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

    if (isOwnProfile) {
      setFetchedPosts(userPosts);
      setLoading(false);
      return;
    }

    fetchProfilePosts(fetchedUser.user.id);
  }, [fetchedUser]);

  return (
    <ProfileViewerPostContext.Provider
      value={{
        loading,
        fetchedPosts,
        setFetchedPosts,
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
