import { Post } from "@/lib/interfaces/postTypes";
import { UserDisplay, UserPosts } from "@/lib/interfaces/userTypes";
import { Dispatch, SetStateAction } from "react";

export interface AccountUserProviderState {
  account?: UserDisplay;
  setAccount: Dispatch<SetStateAction<UserDisplay | undefined>>;
}

export interface AccountPostProviderState {
  userPosts?: UserPosts;
  setUserPosts: Dispatch<SetStateAction<UserPosts | undefined>>;
  onPostUpdate: (post: Post) => void;
}

export const accountUserInitialState: AccountUserProviderState = {
  account: undefined,
  setAccount: () => {},
};

export const accountPostInitialState: AccountPostProviderState = {
  userPosts: undefined,
  setUserPosts: () => {},
  onPostUpdate: () => {},
};
