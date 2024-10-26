import { FeedPost, PostType } from "@/lib/interface";
import { FC } from "react";
import { FeedMediaPostDisplay } from "./FeedMediaPostDisplay";
import { FeedTextPostDisplay } from "./FeedTextPostDisplay";

interface Props {
  feedPost: FeedPost;
}

const FeedDisplayMap: Record<PostType, (props: Props) => React.ReactNode> = {
  TEXT: FeedTextPostDisplay,
  MEDIA: FeedMediaPostDisplay,
};

export const FeedPostDisplay: FC<Props> = ({ feedPost }) => {
  const DisplayComponent = FeedDisplayMap[feedPost.post.postType];
  return <DisplayComponent feedPost={feedPost} />;
};
