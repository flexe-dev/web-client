"use client";

/*This context will be used to display the details of the searched user's profile*/

import React, { useEffect, useState, createContext, use } from "react";
import { useParams } from "next/navigation";
import { UserProfile } from "@prisma/client";
import { User } from "next-auth";
import ErrorPage from "../Error";
import { useAccount } from "@/components/context/AccountProvider";
import { FindUserByUsername } from "@/controllers/AuthController";
import { FindProfileByUserId } from "@/controllers/ProfileController";

interface ProfileViewerProviderState {
  fetchedUser: User | undefined;
  fetchedProfile: UserProfile | undefined;
  isUserProfile: boolean;
  loading: boolean;
  setFetchedUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setFetchedProfile: React.Dispatch<
    React.SetStateAction<UserProfile | undefined>
  >;
}

const initialState: ProfileViewerProviderState = {
  fetchedUser: undefined,
  fetchedProfile: undefined,
  loading: true,
  isUserProfile: false,
  setFetchedUser: () => {},
  setFetchedProfile: () => {},
};

export const ProfileViewerContext =
  createContext<ProfileViewerProviderState>(initialState);

interface Props {
  children: React.ReactNode;
}

export const ProviderViewerProvider = ({ children }: Props) => {
  const { user, profile } = useAccount();
  const params = useParams<{ username: string, tag:string }>();

  const [loading, setLoading] = useState(true);
  const [fetchedUser, setFetchedUser] = useState<User | undefined>();
  const [fetchedProfile, setFetchedProfile] = useState<
    UserProfile | undefined
  >();
  const [isUserProfile, setIsUserProfile] = useState(false);
  const fetchProfileDetails = async (username: string) => {
    await FindUserByUsername(username).then((user) => {
      if (user) {
        setFetchedUser(user);
        FindProfileByUserId(user.id).then((profile) => {
          if (profile) {
            setFetchedProfile(profile);
            setLoading(false);
          }
        });
      }
    });
  };
  useEffect(() => {
    const { username } = params;
    //Check whether or not the user name is the current user or if the user is visiting another profile
    if (username === user?.username) {
      setFetchedUser(user as User);
      setFetchedProfile(profile);
      setIsUserProfile(true);
      setLoading(false);
    } else {
      fetchProfileDetails(username);
    }
  }, [user, profile]);

  return (
    <ProfileViewerContext.Provider
      value={{
        fetchedUser,
        fetchedProfile,
        loading,
        setFetchedUser,
        setFetchedProfile,
        isUserProfile,
      }}
    >
      {!loading && !fetchedUser ? <ErrorPage /> : children}
    </ProfileViewerContext.Provider>
  );
};

export const userProfileViewer = () => {
  const context = React.useContext(ProfileViewerContext);
  if (context === undefined) {
    throw new Error(
      "useProfileViewer must be used within a ProfileViewerProvider"
    );
  }
  return context;
};
