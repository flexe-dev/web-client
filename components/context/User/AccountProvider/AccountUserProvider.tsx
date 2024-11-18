"use client";

import { FindUserDisplayByUserId } from "@/controllers/UserController";
import { ChildNodeProps } from "@/lib/interfaces/componentTypes";
import { UserDisplay } from "@/lib/interfaces/userTypes";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
import { useUserInteractions } from "../../UserInteraction/UserInteractionsProvider";
import {
  accountUserInitialState,
  AccountUserProviderState,
} from "./AccountProviderState";

export const AccountContext = createContext<AccountUserProviderState>(
  accountUserInitialState
);

export const AccountUserProvider = ({ children }: ChildNodeProps) => {
  const session = useSession();
  const { followingUsers, followedByUsers } = useUserInteractions();
  const [account, setAccount] = useState<UserDisplay | undefined>();

  const fetchProfile = async () => {
    if (!session.data?.user) return; // No user ID available
    try {
      const account = await FindUserDisplayByUserId(session.data.user.id);
      setAccount(account);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (!account?.profile) return;
    setAccount({
      ...account,
      profile: {
        ...account.profile,
        following: followingUsers.length,
      },
    });
  }, [followingUsers]);

  useEffect(() => {
    if (!account?.profile) return;
    setAccount({
      ...account,
      profile: {
        ...account.profile,
        followers: followedByUsers.length,
      },
    });
  }, [followedByUsers]);

  useEffect(() => {
    fetchProfile();
  }, [session.data?.user.id]);

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountUser = () => {
  const context = React.useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccountUser must be used within an AccountProvider");
  }
  return context;
};
