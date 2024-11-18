import { useUserFeed } from "@/components/context/User/UserFeedProvider/UserFeedProvider";
import { FeedPost } from "@/lib/interfaces/feedTypes";
import { TextPost } from "@/lib/interfaces/postTypes";
import { FC } from "react";
import TextPostPreview from "../../Posts/Text/textPostPreview";

interface Props {
  feedPost: FeedPost;
}

export const FeedTextPostDisplay: FC<Props> = ({ feedPost }) => {
  const { setFeedPosts } = useUserFeed();
  const post = feedPost.post as TextPost;

  const onPostValueChange = (changedPost: TextPost) => {
    setFeedPosts((prev) => {
      const index = prev.findIndex((feedPost) => feedPost.post.id === post.id);
      if (index === -1) return prev;

      const updatedPost: FeedPost = {
        ...feedPost,
        post: changedPost,
      };

      return [...prev.slice(0, index), updatedPost, ...prev.slice(index + 1)];
    });
  };

  return (
    <TextPostPreview
      origin="feed"
      post={post}
      callback={onPostValueChange}
      user={feedPost.users.creator}
    />
  );
};
