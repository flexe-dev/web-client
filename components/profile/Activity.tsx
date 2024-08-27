import TextPostPreview from "@/components/ui/Posts/text/textPostPreview";
import { useProfilePostViewer } from "../context/ProfileViewPostProvider";
import { useProfileUserViewer } from "../context/ProfileViewUserProvider";

export const Activity = () => {
  const { fetchedUser } = useProfileUserViewer();
  const { fetchedPosts } = useProfilePostViewer();

  if (!fetchedUser || !fetchedPosts) return null;
  const { user } = fetchedUser;
  const { textPosts } = fetchedPosts;
  
  return (
    <div className="w-full mt-4 px-2">
      {textPosts
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((post, index) => (
          <TextPostPreview user={user} post={post} key={index} />
        ))}
    </div>
  );
};
