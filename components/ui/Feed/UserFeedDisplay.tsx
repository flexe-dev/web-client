"use client";

import { useUserFeed } from "@/components/context/User/UserFeedProvider/UserFeedProvider";
import { FeedDisplayReference, FeedPost } from "@/lib/interfaces/feedTypes";
import React, { useEffect } from "react";
import { UserFeedList } from "./UserFeedList";

interface Props {
  feed: FeedDisplayReference[];
  posts: FeedPost[];
}

export const UserFeedDisplay: React.FC<Props> = ({ feed, posts }) => {
  const { setFeedPosts, setFeedReferences, setLoading } = useUserFeed();

  useEffect(() => {
    setFeedPosts(posts);
    setFeedReferences(feed);
    setLoading(false);
  }, [feed, posts]);

  return <UserFeedList />;
};
