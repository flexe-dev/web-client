"use client";

/*This context will be used to display the details of the searched user's profile*/

import { useAccount } from "@/components/context/AccountProvider";
import { FindUserByUsername } from "@/controllers/AuthController";
import { GetAllUserPosts } from "@/controllers/PostController";
import { FindProfileByUserId } from "@/controllers/ProfileController";
import {
  ChildNodeProps,
  PostObject,
  ProfileObject,
  UserObject,
} from "@/lib/interface";
import { User } from "next-auth";
import { useParams } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import ErrorPage from "../Error";

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
      if (!user) {
        setFetchedUser({
          user: undefined,
          loading: false,
        });
        return;
      }
      setFetchedUser({
        user,
        loading: false,
      });

      const profilePromise = FindProfileByUserId(user.id);
      const postPromise = GetAllUserPosts(user.id);

      Promise.all([profilePromise, postPromise]).then((values) => {
        const [profile, userPosts] = values;
        console.log(profile, userPosts);
        if (profile) {
          setFetchedProfile({
            profile,
            loading: false,
          });
        }
        if (userPosts) {
          setUserPosts({
            userPosts,
            loading: false,
          });
        }
      });
    });
  };

  const retrieveUserPosts = async (userID: string) => {
    const posts = await GetAllUserPosts(userID);
    if (!posts) return;

    setUserPosts({
      userPosts: posts,
      loading: false,
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
      retrieveUserPosts(user.id);
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
