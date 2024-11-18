import { FeedDisplayReference, FeedPost } from "@/lib/interfaces/feedTypes";
import { Post } from "@/lib/interfaces/postTypes";
import { Dispatch, SetStateAction } from "react";

export interface FeedProviderState {
  feedReferences: FeedDisplayReference[];
  feedPosts: FeedPost[];
  onPostUpdate: (post: Post) => void;
  setFeedPosts: Dispatch<SetStateAction<FeedPost[]>>;
  setFeedReferences: Dispatch<SetStateAction<FeedDisplayReference[]>>;
  loadMorePosts: () => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const userFeedInitialState: FeedProviderState = {
  feedReferences: [],
  feedPosts: [],
  loading: true,
  setFeedReferences: () => {},
  setFeedPosts: () => {},
  loadMorePosts: () => {},
  setLoading: () => {},
  onPostUpdate: () => {},
};
