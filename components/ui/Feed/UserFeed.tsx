"use server";

import ErrorPage from "@/components/Error";
import { GetUserFeed } from "@/controllers/FeedController";
import { Session } from "next-auth";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { FeedLoading } from "./Loading/FeedLoading";
import { SuggestedConnections } from "./SuggestedConnections";
import { TrendingPostTags } from "./TrendingTags";
import { UserFeedDisplay } from "./UserFeedDisplay";

interface Props {
  session: Session;
}

export const UserFeed: React.FC<Props> = async ({ session }) => {
  const token = cookies().get("next-auth.session-token");

  if (!token) {
    return <div>Unauthorised</div>;
  }

  const feed = await GetUserFeed(token.value);

  if (!feed) {
    return <ErrorPage />;
  }

  return (
    <main className="flex justify-center">
      <aside className="w-1/4">
        <SuggestedConnections />
      </aside>
      <section className="flex flex-grow h-full">
        <Suspense fallback={<FeedLoading />}>
          <UserFeedDisplay feed={feed} />
        </Suspense>
      </section>
      <aside className="w-1/4">
        <TrendingPostTags />
      </aside>
    </main>
  );
};
