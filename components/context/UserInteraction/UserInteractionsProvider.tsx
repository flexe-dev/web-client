"use client";

import {
  FindUserNode,
  FollowUser,
  UnfollowUser,
} from "@/controllers/UserController";
import {
  ChildNodeProps,
  InteractionRelationship,
  PostInteractionLookup,
  PostNode,
  UserDetails,
  UserNode,
} from "@/lib/interface";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface UserInteractionState {
  userNode: UserNode | undefined;

  likedPosts: PostInteractionLookup[];
  savedPosts: PostInteractionLookup[];
  repostedPosts: PostInteractionLookup[];

  followingUsers: InteractionRelationship<UserDetails>[];
  followedByUsers: InteractionRelationship<UserDetails>[];

  likePost: (postId: string) => void;
  savePost: (postId: string) => void;
  repostPost: (postId: string) => void;

  removeLikedPost: (postId: string) => void;
  removeSavedPost: (postId: string) => void;
  removeRepostedPost: (postId: string) => void;

  followUser: (user: UserDetails) => void;
  unfollowUser: (userId: string) => void;
  removeFollowedUser: (userId: string) => void;
}

const initialState: UserInteractionState = {
  userNode: undefined,

  likedPosts: [],
  savedPosts: [],
  repostedPosts: [],

  followingUsers: [],
  followedByUsers: [],

  likePost: () => {},
  savePost: () => {},
  repostPost: () => {},

  removeLikedPost: () => {},
  removeSavedPost: () => {},
  removeRepostedPost: () => {},

  followUser: () => {},
  unfollowUser: () => {},
  removeFollowedUser: () => {},
};

export const UserInteractionsContext =
  createContext<UserInteractionState>(initialState);

export const UserInteractionsProvider: React.FC<ChildNodeProps> = ({
  children,
}) => {
  const session = useSession();
  const [userNode, setUserNode] = useState<UserNode | undefined>();
  const [likedPosts, setLikedPosts] = useState<PostInteractionLookup[]>([]);
  const [savedPosts, setSavedPosts] = useState<PostInteractionLookup[]>([]);
  const [repostedPosts, setRepostedPosts] = useState<PostInteractionLookup[]>(
    []
  );

  const [followingUsers, setFollowingUser] = useState<
    InteractionRelationship<UserDetails>[]
  >([]);
  const [followedByUsers, setFollowedBy] = useState<
    InteractionRelationship<UserDetails>[]
  >([]);

  const generatePostLookupItem = (
    interactions: InteractionRelationship<PostNode>[]
  ): PostInteractionLookup[] => {
    return interactions.map((interaction) => {
      return {
        postId: interaction.root.postId,
        timeStamp: interaction.timestamp,
      };
    });
  };

  const generatePostLookupItemFromId = (
    postId: string
  ): PostInteractionLookup => {
    return { postId, timeStamp: new Date() };
  };

  const generateUserLookup = (
    userInfo: UserDetails
  ): InteractionRelationship<UserDetails> => {
    return {
      timestamp: new Date(),
      root: userInfo,
    };
  };
  

  const likePost = (postId: string) => {
    //Add Post To Liked Posts
    setLikedPosts((prev) => {
      return [generatePostLookupItemFromId(postId), ...prev];
    });
  };
  const savePost = (postId: string) => {
    //Add Post To Saved Posts
    setSavedPosts((prev) => {
      return [generatePostLookupItemFromId(postId), ...prev];
    });
  };

  const repostPost = (postId: string) => {
    setRepostedPosts((prev) => {
      return [generatePostLookupItemFromId(postId), ...prev];
    });
  };

  const removeLikedPost = (postId: string) => {
    //Remove Post From Liked Posts
    setLikedPosts((prev) => {
      return prev.filter((post) => post.postId !== postId);
    });
  };

  const removeSavedPost = (postId: string) => {
    //Remove Post From Saved Posts
    setSavedPosts((prev) => {
      return prev.filter((post) => post.postId !== postId);
    });
  };

  const removeRepostedPost = (postId: string) => {
    setRepostedPosts((prev) => {
      return prev.filter((post) => post.postId !== postId);
    });
  };

  const followUser = (user: UserDetails) => {
    if (!userNode) return;

    const response = FollowUser(user.userId, session.data?.token);
    if (!response) {
      toast.error("Unable to follow user, please try again later");
      return;
    }

    //Add User To Followed Users
    setFollowingUser((prev) => {
      return [generateUserLookup(user), ...prev];
    });
  };

  const unfollowUser = (userId: string) => {
    if (!userNode) return;

    const response = UnfollowUser(userId, session.data?.token);

    if (!response) {
      toast.error("Unable to unfollow user, please try again later");
      return;
    }

    //Remove User From Followed Users
    setFollowingUser((prev) => {
      return prev.filter((user) => user.root.userId !== userId);
    });
  };
  const removeFollowedUser = (userId: string) => {
    if (!userNode) return;

    toast.error("Ill implement this later lmao");

    //Remove User From Following Users
    setFollowedBy((prev) => {
      return prev.filter((user) => user.root.userId !== userId);
    });
  };

  const fetchUserNode = async () => {
    if (!session.data?.user) return;
    const node = await FindUserNode(session.data.user.id, session.data.token);
    if (!node) return;

    setUserNode(node);
    //Generate Lookups For Post Interactions
    setLikedPosts(generatePostLookupItem(node.likedPosts));
    setSavedPosts(generatePostLookupItem(node.savedPosts));
    setRepostedPosts(generatePostLookupItem(node.repostedPosts));

    //Generate Lookups For User Interactions
    setFollowingUser(node.following);
    setFollowedBy(node.followers);
  };

  useEffect(() => {
    fetchUserNode();
  }, [session.data?.user.id]);

  return (
    <UserInteractionsContext.Provider
      value={{
        userNode,
        likedPosts,
        savedPosts,
        repostedPosts,
        followingUsers,
        followedByUsers,
        savePost,
        likePost,
        repostPost,
        removeLikedPost,
        removeSavedPost,
        removeRepostedPost,
        followUser,
        unfollowUser,
        removeFollowedUser,
      }}
    >
      {children}
    </UserInteractionsContext.Provider>
  );
};

export const useUserInteractions = () => {
  const context = useContext(UserInteractionsContext);
  if (context === undefined) {
    throw new Error(
      "useUserInteractions must be used within an UserInteractionsProvider"
    );
  }
  return context;
};
