import { ChildNodeProps } from "@/lib/interfaces/componentTypes";
import { Post, PostMetrics } from "@/lib/interfaces/postTypes";
import { defaultPostMetrics } from "@/lib/util/postUtils";
export interface PostInteractionState {
  metrics: PostMetrics;
  postId: string;
  likePost: () => void;
  unlikePost: () => void;
  repostPost: () => void;
  removeRepost: () => void;
  savePost: () => void;
  unsavePost: () => void;
  addComment: (count: number) => void;
  removeComment: (count: number) => void;
}

export interface PostInteractionContextProps extends ChildNodeProps {
  post: Post;
  callback?: (post: Post) => void;
}

export const postInteractionInitialState: PostInteractionState = {
  metrics: defaultPostMetrics,
  postId: "",
  addComment: () => {},
  removeComment: () => {},
  likePost: () => {},
  unlikePost: () => {},
  repostPost: () => {},
  removeRepost: () => {},
  savePost: () => {},
  unsavePost: () => {},
};
