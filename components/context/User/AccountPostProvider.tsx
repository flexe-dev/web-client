"use client";

import { GetUserPosts } from "@/controllers/PostController";
import { ChildNodeProps, UserPosts } from "@/lib/interface";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface AccountProviderState {
  userPosts?: UserPosts;
  setUserPosts: Dispatch<SetStateAction<UserPosts | undefined>>;
}

const initialState: AccountProviderState = {
  userPosts: undefined,
  setUserPosts: () => {},
};

export const AccountContext = createContext<AccountProviderState>(initialState);

export const AccountPostProvider = ({ children }: ChildNodeProps) => {
  const session = useSession();
  const [userPosts, setUserPosts] = useState<UserPosts>();

  const fetchPosts = async () => {
    if (!session.data?.user) return; // No user ID available
    try {
      const userPosts = await GetUserPosts(session.data.user.id);
      setUserPosts(userPosts);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (session.data?.user.id) {
      fetchPosts();
    }
  }, [session.data?.user.id]);

  return (
    <AccountContext.Provider
      value={{
        userPosts,
        setUserPosts,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountPost = () => {
  const context = React.useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccountPost must be used within an AccountProvider");
  }
  return context;
};
