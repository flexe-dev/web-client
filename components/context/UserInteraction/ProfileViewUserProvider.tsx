"use client";

import { FindUserDisplayByUsername } from "@/controllers/UserController";
import { ChildNodeProps, UserDisplay } from "@/lib/interface";
import { useParams } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import ErrorPage from "../../Error";
import { useAccountUser } from "../User/AccountUserProvider";

interface ProfileViewerProviderState {
  isOwnProfile: boolean;
  fetchedUser?: UserDisplay;
  loading: boolean;
  setFetchedUser: React.Dispatch<React.SetStateAction<UserDisplay | undefined>>;
}

const initialState: ProfileViewerProviderState = {
  isOwnProfile: false,
  fetchedUser: undefined,
  loading: true,
  setFetchedUser: () => {},
};

export const ProfileViewerUserContext =
  createContext<ProfileViewerProviderState>(initialState);

export const ProfileViewerUserProvider: React.FC<ChildNodeProps> = ({
  children,
}) => {
  const { account } = useAccountUser();
  const params = useParams<{ username: string; tag: string }>();
  const [isOwnProfile, setisOwnProfile] = useState(false);
  const [fetchedUser, setFetchedUser] = useState<UserDisplay | undefined>();

  const [loading, setLoading] = useState<boolean>(true);
  const fetchProfileDetails = async (username: string) => {
    try {
      const account = await FindUserDisplayByUsername(username);
      if (account) {
        setFetchedUser(account);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const mapToUserAccount = (account: UserDisplay) => {
    setFetchedUser(account);
    setisOwnProfile(true);
    setLoading(false);
  };

  useEffect(() => {
    const { username } = params;

    //Check whether or not the user name is the current user or if the user is visiting another profile
    if (username === account?.user.username) {
      mapToUserAccount(account);
      return;
    }

    if (fetchedUser) return;
    fetchProfileDetails(username);
  }, [account]);

  return (
    <ProfileViewerUserContext.Provider
      value={{
        loading,
        fetchedUser,
        setFetchedUser: setFetchedUser,
        isOwnProfile,
      }}
    >
      {!loading && (!fetchedUser || !fetchedUser.user.onboarded) ? (
        <ErrorPage />
      ) : (
        children
      )}
    </ProfileViewerUserContext.Provider>
  );
};

export const useProfileUserViewer = () => {
  const context = React.useContext(ProfileViewerUserContext);
  if (context === undefined) {
    throw new Error(
      "useProfileViewer must be used within a ProfileViewerProvider"
    );
  }
  return context;
};
