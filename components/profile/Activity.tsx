import TextPostPreview from "@/components/ui/Posts/text/textPostPreview";
import { sortPostsByDate } from "@/lib/util/utils";
import { PostInteractionProvider } from "../context/User/PostInteractionContext";
import { useProfilePostViewer } from "../context/UserInteraction/ProfileViewPostProvider";
import { useProfileUserViewer } from "../context/UserInteraction/ProfileViewUserProvider";

export const Activity = () => {
  const { fetchedUser } = useProfileUserViewer();
  const { fetchedPosts } = useProfilePostViewer();

  if (!fetchedUser || !fetchedPosts) return null;
  const { user } = fetchedUser;
  const { textPosts } = fetchedPosts;

  return (
    <div className="w-full mt-4 px-2">
      {sortPostsByDate(textPosts).map((post) => (
        <PostInteractionProvider
          key={post.id}
          postId={post.id!}
          postMetrics={post.metrics}
          postType="TEXT"
        >
          <TextPostPreview user={user} post={post} />
        </PostInteractionProvider>
      ))}
    </div>
  );
};
