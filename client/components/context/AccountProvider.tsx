"use client";

import { FindAccountByUserId } from "@/controllers/UserController";
import {
  ChildNodeProps,
  UserPost,
  UserProfile,
  UserTextPost,
} from "@/lib/interface";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect } from "react";

interface AccountProviderState {
  user: User | undefined;
  profile: UserProfile | undefined;
  mediaPosts: UserPost[];
  textPosts: UserTextPost[];
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | undefined>>;
  setMediaPosts: React.Dispatch<React.SetStateAction<UserPost[]>>;
  setTextPosts: React.Dispatch<React.SetStateAction<UserTextPost[]>>;
}

const initialState: AccountProviderState = {
  user: undefined,
  profile: undefined,
  mediaPosts: [],
  textPosts: [],
  setUser: () => {},
  setProfile: () => {},
  setMediaPosts: () => {},
  setTextPosts: () => {},
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
  const [textPosts, setTextPosts] = React.useState<UserTextPost[]>([]);

  const fetchProfile = async () => {
    if (!user) return; // No user ID available

    try {
      const userData = session.data?.user;
      if (userData) {
        const account = await FindAccountByUserId(userData.id);
        if (account) {
          setProfile(account.profile);
          setMediaPosts(account.mediaPosts ?? []);
          setTextPosts(account.textPosts ?? []);
        }
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
        textPosts,
        setUser,
        setProfile,
        setMediaPosts,
        setTextPosts,
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
