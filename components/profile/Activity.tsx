import TextPostPreview from "@/components/ui/Posts/Text/textPostPreview";
import { TextPost, UserDisplay, UserPosts } from "@/lib/interface";
import { cn, sortPostsByDate, toUserDetails } from "@/lib/util/utils";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import { useAccountPost } from "../context/User/AccountPostProvider";
import { useProfilePostViewer } from "../context/UserInteraction/ProfileViewPostProvider";
import { useProfileUserViewer } from "../context/UserInteraction/ProfileViewUserProvider";
import PostCreateDialog from "../creator/PostCreateDialog";
import { Button } from "../ui/Shared/button";
import { Card } from "../ui/Shared/card";
import { Dialog, DialogTrigger } from "../ui/Shared/dialog";
import { opacityTransition } from "./Posts";

export const Activity = () => {
  const { data } = useSession();
  const { fetchedUser } = useProfileUserViewer();
  const { fetchedPosts } = useProfilePostViewer();

  if (!fetchedUser || !fetchedPosts) return null;
  const { user } = fetchedUser;
  const { textPosts } = fetchedPosts;
  const isOwnProfile = data?.user?.id === user.id;

  return textPosts.length === 0 ? (
    <EmptyActivityTemplate isOwnProfile={isOwnProfile} />
  ) : (
    <ProfileActivityPosts posts={textPosts} user={fetchedUser} />
  );
};

interface EmptyTemplateProps {
  isOwnProfile: boolean;
}

interface ActivityPostProps {
  user: UserDisplay;
  posts: TextPost[];
}

const ProfileActivityPosts: FC<ActivityPostProps> = ({ user, posts }) => {
  const { data } = useSession();
  const { setFetchedPosts } = useProfilePostViewer();
  const { setUserPosts } = useAccountPost();

  const onTextPostChange = (post: TextPost) => {
    if (!data?.user) return;

    const isOwnPost = post.auxData.userID === data.user.id;
    if (isOwnPost) {
      setUserPosts((prev) => handlePostObjectReplacement(post, prev));
      return;
    }
    setFetchedPosts((prev) => handlePostObjectReplacement(post, prev));
  };

  const handlePostObjectReplacement = (
    post: TextPost,
    posts?: UserPosts
  ): UserPosts | undefined => {
    if (!posts) return;

    const textPostIndex = posts.textPosts.findIndex((p) => p.id === post.id);
    if (textPostIndex === -1) return posts;

    return {
      ...posts,
      textPosts: [
        ...posts.textPosts.slice(0, textPostIndex),
        post,
        ...posts.textPosts.slice(textPostIndex + 1),
      ],
    };
  };

  return (
    <div className="w-full mt-4 px-2">
      {sortPostsByDate(posts).map((post) => (
        <TextPostPreview
          origin="profile"
          key={post.id}
          callback={onTextPostChange}
          user={toUserDetails(user)}
          post={post}
        />
      ))}
    </div>
  );
};

const EmptyActivityTemplate: FC<EmptyTemplateProps> = ({ isOwnProfile }) => {
  return isOwnProfile ? <EmptyUserActivity /> : <EmptyActivityView />;
};

const EmptyActivityView = () => {
  return (
    <div className="flex flex-col items-center mt-8">
      <ChatBubbleLeftEllipsisIcon className="w-16 h-16" />
      <h2 className="text-lg font-semibold mt-4 capitalize">
        No Activity yet{" "}
      </h2>
    </div>
  );
};

const EmptyUserActivity = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <Card className="relative border-dashed border-2 shadow-none flex items-center justify-center flex-col border-secondary my-4 w-full h-36">
          <div className="flex items-center">
            <ChatBubbleLeftEllipsisIcon className="w-10 h-10 mr-4" />
            <div className="">
              <h2 className="text-lg lg:text-xl font-semibold capitalize">
                Get the conversation going
              </h2>
              <h3 className="text-xs lg:text-sm text-secondary-header max-w-md">
                Share your thoughts, ideas, and creations with the community or
                interact with other creators
              </h3>
            </div>
          </div>
          <DialogTrigger>
            <Button
              onClick={() => setOpenDialog(true)}
              variant={"outline"}
              className="bg-background absolute bottom-4 right-4"
            >
              Create a New Post
            </Button>
          </DialogTrigger>
        </Card>
        <PostCreateDialog dispatch={setOpenDialog} />
      </Dialog>
      {Array.from({ length: 4 }).map((_, index) => (
        <Card
          key={`empty-post-${index}`}
          className={cn(
            "border-none shadow-none my-4 w-full h-28",
            opacityTransition[index + 2]
          )}
        ></Card>
      ))}
    </>
  );
};
