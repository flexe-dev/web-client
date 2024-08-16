"use client";

import { FindUserNode } from "@/controllers/UserController";
import {
  ChildNodeProps,
  PostInteractionLookup,
  PostInteractionRelationship,
  UserNode,
} from "@/lib/interface";
import { useSession } from "next-auth/react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserInteractionState {
  userNode: UserNode | undefined;
  likedPosts: PostInteractionLookup[];
  savedPosts: PostInteractionLookup[];
  setUserNode: Dispatch<SetStateAction<UserNode | undefined>>;
  setLikedPosts: Dispatch<SetStateAction<PostInteractionLookup[]>>;
  setSavedPosts: Dispatch<SetStateAction<PostInteractionLookup[]>>;
}

const initialState: UserInteractionState = {
  userNode: undefined,
  likedPosts: [],
  savedPosts: [],
  setUserNode: () => {},
  setLikedPosts: () => {},
  setSavedPosts: () => {},
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

  const generateLookupItems = (interactions: PostInteractionRelationship[]) => {
    return interactions.map((interaction) => {
      return {
        postId: interaction.post.postId,
        timeStamp: interaction.timestamp,
      };
    });
  };

  const fetchUserNode = async () => {
    if (!session.data?.user) return;

    try {
      const node = await FindUserNode(session.data.user.id);
      if (!node) return;

      setUserNode(node);
      setLikedPosts(generateLookupItems(node.likedPosts));
      setSavedPosts(generateLookupItems(node.savedPosts));
    } catch (error) {
      console.error("Error fetching user node:", error);
    }
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
        setUserNode,
        setLikedPosts,
        setSavedPosts,
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
