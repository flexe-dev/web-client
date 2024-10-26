"use server";

import ErrorPage from "@/components/Error";
import { GetFeedPosts, GetUserFeed } from "@/controllers/FeedController";
import { SortUserFeed } from "@/lib/util/feedUtils";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { FeedLoading } from "./Loading/FeedLoading";
import { SuggestedConnections } from "./SuggestedConnections";
import { TrendingPostTags } from "./TrendingTags";
import { UserFeedDisplay } from "./UserFeedDisplay";

export const UserFeed = async () => {
  // Constant Value for Posts loaded per chunk
  const POST_LIMIT = 10;

  const token = cookies().get("next-auth.session-token");

  if (!token) {
    return <div>Unauthorised</div>;
  }
  const feed = await GetUserFeed(token.value);

  if (!feed) {
    return <ErrorPage />;
  }

  //Load Initial Set of Posts
  const sortedFeed = SortUserFeed(feed);
  const posts = await GetFeedPosts(sortedFeed.slice(0, POST_LIMIT), token.value);
  
  if (!posts) {
    return <ErrorPage />;
  }

  return (
    <main className="flex justify-center">
      <aside className="w-1/4">
        <SuggestedConnections />
      </aside>
      <section className="flex flex-grow h-full">
        <Suspense fallback={<FeedLoading />}>
          <UserFeedDisplay feed={sortedFeed} posts={posts} />
        </Suspense>
      </section>
      <aside className="w-1/4">
        <TrendingPostTags />
      </aside>
    </main>
  );
};
