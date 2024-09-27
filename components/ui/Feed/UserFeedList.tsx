import { useUserFeed } from "@/components/context/UserFeedProvider";
import { FeedPost } from "@/lib/interface";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FeedListLoading } from "./Loading/FeedListLoading";

export const UserFeedList = () => {
  const POST_LIMIT = 10;
  const { feedReferences } = useUserFeed();

  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [feedPostOffset, setFeedPostOffset] = useState<number>(0);

  const fetchNextPosts = () => {
    //Fetch Data
    //Append Data
    //Increment Offset
  };

  return (
    <>
      <InfiniteScroll
        dataLength={feedReferences.length}
        next={fetchNextPosts}
        hasMore={feedReferences.length > feedPostOffset * POST_LIMIT}
        loader={<FeedListLoading />}
        endMessage={<EndFeed />}
      ></InfiniteScroll>
    </>
  );
};

const EndFeed = () => {
  return <div>Message</div>;
};

const EndUnreadFeed = () => {
  return <div>Message</div>;
};
