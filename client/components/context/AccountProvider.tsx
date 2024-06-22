"use client";

import { FindAccountByUserId } from "@/controllers/UserController";
import { ChildNodeProps, UserPost, UserProfile } from "@/lib/interface";
import { User } from "next-auth";
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
        const account = await FindAccountByUserId(userData.id);
        if (account) {
          setProfile(account.profile);
          setMediaPosts(account.mediaPosts ?? []);
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
