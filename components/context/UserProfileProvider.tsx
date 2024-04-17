"use client";

/*This context will be used to display the details of the searched user's profile*/

import React, { useEffect, useState, createContext, use } from "react";
import { useParams } from "next/navigation";
import { UserPost, UserProfile } from "@prisma/client";
import { User } from "next-auth";
import ErrorPage from "../Error";
import { useAccount } from "@/components/context/AccountProvider";
import { FindUserByUsername } from "@/controllers/AuthController";
import { FindProfileByUserId } from "@/controllers/ProfileController";
import {
  UserObject,
  ProfileObject,
  PostObject,
  ChildNodeProps,
} from "@/lib/interface";

interface ProfileViewerProviderState {
  isOwnProfile: boolean;
  fetchedUser: UserObject;
  fetchedProfile: ProfileObject;
  userPosts: PostObject;
  setFetchedUser: React.Dispatch<React.SetStateAction<UserObject>>;
  setFetchedProfile: React.Dispatch<React.SetStateAction<ProfileObject>>;
}

const initialUser: UserObject = {
  user: undefined,
  loading: true,
};

const initialProfile: ProfileObject = {
  profile: undefined,
  loading: true,
};

const initialPosts: PostObject = {
  userPosts: [],
  loading: true,
};

const initialState: ProfileViewerProviderState = {
  fetchedUser: initialUser,
  fetchedProfile: initialProfile,
  userPosts: initialPosts,
  isOwnProfile: false,
  setFetchedUser: () => {},
  setFetchedProfile: () => {},
};

export const ProfileViewerContext =
  createContext<ProfileViewerProviderState>(initialState);

export const ProviderViewerProvider = ({ children }: ChildNodeProps) => {
  const { user, profile } = useAccount();
  const params = useParams<{ username: string; tag: string }>();

  const [isOwnProfile, setisOwnProfile] = useState(false);
  const [fetchedUser, setFetchedUser] = useState<UserObject>(initialUser);
  const [fetchedProfile, setFetchedProfile] =
    useState<ProfileObject>(initialProfile);
  const [userPosts, setUserPosts] = useState<PostObject>(initialPosts);

  const fetchProfileDetails = async (username: string) => {
    await FindUserByUsername(username).then((user) => {
      if (user) {
        setFetchedUser({
          user,
          loading: false,
        });
        FindProfileByUserId(user.id).then((profile) => {
          if (profile) {
            setFetchedProfile({
              profile,
              loading: false,
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    const { username } = params;
    //Check whether or not the user name is the current user or if the user is visiting another profile
    if (username === user?.username) {
      setFetchedUser({
        user: user as User,
        loading: false,
      });
      setFetchedProfile({
        profile: profile,
        loading: false,
      });

      setisOwnProfile(true);
    } else {
      fetchProfileDetails(username);
    }
  }, [user, profile]);

  useEffect(() => {
    if (fetchedUser) {
    }
  }, [fetchedUser]);

  return (
    <ProfileViewerContext.Provider
      value={{
        fetchedUser,
        fetchedProfile,
        userPosts,
        setFetchedUser,
        setFetchedProfile,
        isOwnProfile,
      }}
    >
      {!fetchedUser.loading && !fetchedUser.user ? <ErrorPage /> : children}
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
