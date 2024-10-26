import { useUserFeed } from "@/components/context/User/UserFeedProvider";
import { FeedPost, TextPost } from "@/lib/interface";
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
    <div className="w-full">
      <TextPostPreview
        origin="feed"
        post={post}
        callback={onPostValueChange}
        user={feedPost.users.creator}
      />
    </div>
  );
};
