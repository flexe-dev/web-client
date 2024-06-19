"use client";

import { GetAllUserPosts } from "@/controllers/PostController";
import { FindProfileByUserId } from "@/controllers/UserController";
import { ChildNodeProps, UserPost } from "@/lib/interface";
import { User, UserProfile } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect } from "react";

interface AccountProviderState {
  user: User | undefined;
  profile: UserProfile | undefined;
  mediaPosts: UserPost[];
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | undefined>>;
  setMediaPosts: React.Dispatch<React.SetStateAction<UserPost[]>>;
}

const initialState: AccountProviderState = {
  user: undefined,
  profile: undefined,
  mediaPosts: [],
  setUser: () => {},
  setProfile: () => {},
  setMediaPosts: () => {},
};

export const AccountContext = createContext<AccountProviderState>(initialState);

export const AccountProvider = ({ children }: ChildNodeProps) => {
  const session = useSession();
  const [user, setUser] = React.useState<User | undefined>(
    session.data?.user as User
  );
  const [profile, setProfile] = React.useState<UserProfile | undefined>(
    undefined
  );

  const [mediaPosts, setMediaPosts] = React.useState<UserPost[]>([]);

  const fetchProfile = async () => {
    if (!user) return; // No user ID available

    try {
      const userData = session.data?.user;
      if (userData) {
        const userProfile = FindProfileByUserId(userData.id);
        const mediaPosts = GetAllUserPosts(userData.id);
        Promise.all([userProfile, mediaPosts]).then(([profile, posts]) => {
          setProfile(profile ?? undefined);
          setMediaPosts(posts ?? []);
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [session.data?.user]);

  return (
    <AccountContext.Provider
      value={{
        user,
        profile,
        mediaPosts,
        setUser,
        setProfile,
        setMediaPosts,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = React.useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};