"use client";

import { useAccount } from "@/components/context/AccountProvider";
import {
  FindAccountByUsername,
  FindUserNode,
} from "@/controllers/UserController";
import { ChildNodeProps, UserAccount, UserNode } from "@/lib/interface";
import { useParams } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import ErrorPage from "../Error";
import { useUserInteractions } from "./UserInteractionsProvider";

interface ProfileViewerProviderState {
  isOwnProfile: boolean;
  fetchedAccount?: UserAccount;
  loading: boolean;
  setFetchedAccount: React.Dispatch<
    React.SetStateAction<UserAccount | undefined>
  >;
}

const initialState: ProfileViewerProviderState = {
  isOwnProfile: false,
  fetchedAccount: undefined,
  loading: true,
  setFetchedAccount: () => {},
};

export const ProfileViewerContext =
  createContext<ProfileViewerProviderState>(initialState);

export const ProfileViewerProvider: React.FC<ChildNodeProps> = ({
  children,
}) => {
  const { account } = useAccount();
  const { userNode } = useUserInteractions();
  const params = useParams<{ username: string; tag: string }>();

  const [isOwnProfile, setisOwnProfile] = useState(false);
  const [fetchedAccount, setFetchedAccount] = useState<
    UserAccount | undefined
  >();
  const [fetchedUserNode, setFetchedUserNode] = useState<
    UserNode | undefined
  >();
  const [loading, setLoading] = useState<boolean>(true);
  const fetchProfileDetails = async (username: string) => {
    try {
      const account = await FindAccountByUsername(username);
      if (account) {
        setFetchedAccount(account);
        const node = await FindUserNode(account.user.id);
        setFetchedUserNode(node);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    const { username } = params;
    if (!account) return;
    //Check whether or not the user name is the current user or if the user is visiting another profile
    if (username === account?.user.username) {
      setFetchedAccount(account);
      setFetchedUserNode(userNode);
      setisOwnProfile(true);
      setLoading(false);
    } else {
      fetchProfileDetails(username);
    }
  }, [account]);

  return (
    <ProfileViewerContext.Provider
      value={{
        loading,
        fetchedAccount,
        setFetchedAccount,
        isOwnProfile,
      }}
    >
      {!loading && !fetchedAccount ? <ErrorPage /> : children}
    </ProfileViewerContext.Provider>
  );
};

export const useProfileViewer = () => {
  const context = React.useContext(ProfileViewerContext);
  if (context === undefined) {
    throw new Error(
      "useProfileViewer must be used within a ProfileViewerProvider"
    );
  }
  return context;
};
