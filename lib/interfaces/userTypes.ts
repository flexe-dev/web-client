import { User } from "next-auth";
import { InteractionRelationship } from "./interactionTypes";
import { MediaPost, TextPost, PostNode } from "./postTypes";

//User Profile Object
export interface UserProfile {
  id: string;
  userId: string;
  job?: string;
  followers: number;
  following: number;
  company?: string;
  pronouns?: string;
  location?: string;
  bio?: string;
  external: ProfileExternalLinks;
}

export interface UserDisplay {
  user: User;
  profile?: UserProfile;
}

export interface UserPosts {
  mediaPosts: MediaPost[];
  textPosts: TextPost[];
}

export interface ProfileExternalLinks {
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

export type Authentication = "authenticated" | "unauthenticated" | "loading";

const networkStatus = ["friends", "following", "followed", "none"] as const;
export type NetworkStatus = (typeof networkStatus)[number];

export interface UserDetails {
  userId: string;
  name: string;
  image: string;
  username: string;
  job?: string;
}

export interface UserNode {
  blockedUsers: InteractionRelationship<UserDetails>[];
  likedPosts: InteractionRelationship<PostNode>[];
  repostedPosts: InteractionRelationship<PostNode>[];
  savedPosts: InteractionRelationship<PostNode>[];
  following: InteractionRelationship<UserDetails>[];
  followers: InteractionRelationship<UserDetails>[];
}

export interface UserConnection extends InteractionRelationship<UserDetails> {
  relationshipType: "FOLLOWER" | "FOLLOWING";
  mutual: UserDetails[];
}

export interface UserNetwork {
  user: UserDetails;
  following: UserConnection[];
  followers: UserConnection[];
}
