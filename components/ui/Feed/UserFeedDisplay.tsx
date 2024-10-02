"use client";

import { UserFeedProvider } from "@/components/context/User/UserFeedProvider";
import { FeedDisplayReference } from "@/lib/interface";
import React from "react";
import { UserFeedList } from "./UserFeedList";

interface Props {
  feed: FeedDisplayReference[];
}

export const UserFeedDisplay: React.FC<Props> = ({ feed }) => {
  return (
    <UserFeedProvider feed={feed}>
      <UserFeedList />
    </UserFeedProvider>
  );
};
