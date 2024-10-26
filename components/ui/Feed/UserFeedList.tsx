import { useUserFeed } from "@/components/context/User/UserFeedProvider";
import { NewspaperIcon } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FeedPostDisplay } from "./Display/FeedPostDisplay";
import { FeedListLoading } from "./Loading/FeedListLoading";

export const UserFeedList = () => {
  const { feedPosts, feedReferences, loadMorePosts, loading } = useUserFeed();

  if (loading) {
    return <FeedListLoading />;
  }

  if (!feedPosts || feedPosts.length === 0) {
    return <>you have no posts</>;
  }

  return (
    <div className="w-full mx-6 mt-4">
      <InfiniteScroll
        className="w-full"
        dataLength={feedPosts.length}
        next={loadMorePosts}
        hasMore={feedPosts.length < feedReferences.length}
        loader={<FeedListLoading />}
        endMessage={<EndFeed />}
      >
        {feedPosts.map((post) => {
          return <FeedPostDisplay key={post.post.id} feedPost={post} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

const EndFeed = () => {
  return (
    <div className="border-y p-8 mt-12 mx-8 flex flex-col items-center">
      <NewspaperIcon className="w-14 h-14 mb-2" />
      <div className="text-primary text-lg">
        You have reached the end of your feed.
      </div>
      <div className="text-secondary-header text-sm mt-2">
        We will continue to show you posts from creators we think you'll like.
      </div>
    </div>
  );
};

const EndUnreadFeed = () => {
  return <div></div>;
};
