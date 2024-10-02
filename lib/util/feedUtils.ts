import { FeedDisplayReference } from "../interface";

export const sortByReadStatus = (
  feed: FeedDisplayReference[]
): FeedDisplayReference[] => {
  const readPosts = feed
    .filter((post) => post.userFeed.readStatus)
    .sort(
      (a, b) =>
        new Date(b.userFeed.key.postDate).getTime() -
        new Date(a.userFeed.key.postDate).getTime()
    );
  const unreadPosts = feed
    .filter((post) => !post.userFeed.readStatus)
    .sort(
      (a, b) =>
        new Date(b.userFeed.key.postDate).getTime() -
        new Date(a.userFeed.key.postDate).getTime()
    );

  return [...unreadPosts, ...readPosts];
};
