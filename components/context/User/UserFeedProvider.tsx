"use client";

import { ChildNodeProps, FeedDisplayReference } from "@/lib/interface";
import { sortByReadStatus } from "@/lib/util/feedUtils";
import React, { createContext, useContext, useState } from "react";

interface FeedProviderState {
  feedReferences: FeedDisplayReference[];
  setFeedReferences: React.Dispatch<
    React.SetStateAction<FeedDisplayReference[]>
  >;
}

interface FeedProviderProps extends ChildNodeProps {
  feed: FeedDisplayReference[];
}

const initialState: FeedProviderState = {
  feedReferences: [],
  setFeedReferences: () => {},
};

export const UserFeedContext = createContext<FeedProviderState>(initialState);

export const UserFeedProvider: React.FC<FeedProviderProps> = ({
  children,
  feed,
}) => {
  const [feedReferences, setFeedReferences] = useState<FeedDisplayReference[]>(
    sortByReadStatus(feed)
  );

  return (
    <UserFeedContext.Provider value={{ feedReferences, setFeedReferences }}>
      {children}
    </UserFeedContext.Provider>
  );
};

export const useUserFeed = () => {
  const context = useContext(UserFeedContext);
  if (!context) {
    throw new Error("useUserFeed must be used within a UserFeedProvider");
  }
  return context;
};
