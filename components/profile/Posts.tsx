"use client";

import { ChildNodeProps, ClassNameProp, MediaPost } from "@/lib/interface";
import { cn, sortPostsByDate } from "@/lib/util/utils";
import {
  ArrowUpTrayIcon,
  CameraIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { FC, forwardRef, SetStateAction, useState } from "react";
import { useAccountPost } from "../context/User/AccountPostProvider";
import { useProfilePostViewer } from "../context/UserInteraction/ProfileViewPostProvider";
import { useProfileUserViewer } from "../context/UserInteraction/ProfileViewUserProvider";
import PostCreateDialog from "../creator/PostCreateDialog";
import PostDisplayModal from "../ui/Posts/Media/PostDisplayModal";
import { Button } from "../ui/Shared/button";
import { Dialog, DialogTrigger } from "../ui/Shared/dialog";

const Posts = () => {
  const { data } = useSession();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { fetchedPosts } = useProfilePostViewer();
  const { fetchedUser, loading } = useProfileUserViewer();

  if (!fetchedUser || !fetchedPosts) return null;

  const { user } = fetchedUser;
  const { mediaPosts: posts } = fetchedPosts;

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <div className="w-full">
          {posts.length > 0 && (
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                onClick={() => setOpenDialog(true)}
                className="h-[5rem] border-2 my-4 rounded-sm w-full  flex justify-center items-center hover:bg-accent transition-colors"
              >
                <PlusCircleIcon className="w-7 h-7" />
                <p className="text-xl ml-2">Upload a new post</p>
              </Button>
            </DialogTrigger>
          )}
        </div>
        {posts.length === 0 && (
          <EmptyPostTemplate
            dispatch={setOpenDialog}
            isOwnProfile={fetchedUser?.user.id === data?.user.id}
          />
        )}
        <PostCreateDialog dispatch={setOpenDialog} />
      </Dialog>

      {posts.length > 0 && <UserPosts user={user} posts={posts} />}
    </>
  );
};

interface TileProps extends ChildNodeProps, ClassNameProp {}
const PostTile = forwardRef<HTMLDivElement, TileProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "aspect-[4/3] w-full mx-auto my-2 min-w-[18rem] cursor-pointer rounded-lg overflow-hidden border border-border/50 dark:border-2 shadow-md shadow-tertiary dark:shadow-none hover:brightness-50 transition-all",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

PostTile.displayName = "PostTile"; // Add this line to avoid display name issues

interface UserPostPreviewProps {
  post: MediaPost;
  user: User;
}

const UserPostPreview: FC<UserPostPreviewProps> = ({ post, user }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { onPostUpdate } = useAccountPost();
  const { onPostUpdate: onProfilePostUpdate } = useProfilePostViewer();
  const { data } = useSession();
  const isOwnProfile: boolean = user.id === data?.user.id;

  const openPost = (post: MediaPost) => {
    setOpen(true);
    window.history.pushState(null, "", `/post/media/${post.id}`);
  };

  const closePostModal = () => {
    window.history.pushState(null, "", `/${user.username}/posts`);
  };

  return (
    <PostDisplayModal
      onPostUpdate={isOwnProfile ? onPostUpdate : onProfilePostUpdate}
      key={`user-post-${post.id}`}
      post={post}
      interaction={{ open, setOpen }}
      modalCloseCallback={closePostModal}
    >
      <PostTile>
        <div className="w-full h-full" onClick={() => openPost(post)}>
          <div className="relative w-full h-full">
            <Image
              src={
                post.document.thumbnail ??
                process.env.NEXT_PUBLIC_FALLBACK_PHOTO
              }
              fill
              alt={`Post ${post.document.title} cover image`}
              objectFit="cover"
            />
          </div>
        </div>
      </PostTile>
    </PostDisplayModal>
  );
};

export const opacityTransition = [
  "bg-inverted/15 dark:bg-inverted-foreground/15",
  "bg-inverted/10 dark:bg-inverted-foreground/[12.5%]",
  "bg-inverted/[7.5%] dark:bg-inverted-foreground/10",
  "bg-inverted/5 dark:bg-inverted-foreground/[7.5%]",
  "bg-inverted/[2.5%] dark:bg-inverted-foreground/5",
];

interface UserPostProps {
  posts: MediaPost[];
  user: User;
}

const UserPosts: FC<UserPostProps> = ({ posts, user }) => {
  return (
    <>
      <div className="grid p-8 md:p-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-2 justify-center relative my-4 w-full ">
        {sortPostsByDate(
          posts.filter((post) => post.document.postStatus === "PUBLISHED")
        ).map((post) => (
          <UserPostPreview key={post.id} post={post} user={user} />
        ))}
      </div>
    </>
  );
};
interface Props {
  dispatch: React.Dispatch<SetStateAction<boolean>>;
  isOwnProfile: boolean;
}

const EmptyPostTemplate = ({ dispatch, isOwnProfile }: Props) => {
  return isOwnProfile ? (
    <EmptyPostUserTemplate dispatch={dispatch} />
  ) : (
    <EmptyProfileTemplate />
  );
};

const EmptyPostUserTemplate: React.FC<Pick<Props, "dispatch">> = ({
  dispatch,
}) => {
  return (
    <div className="flex flex-wrap justify-center relative my-4 w-full">
      <div className="border-2 border-secondary border-dashed flex flex-col justify-center items-center aspect-[4/3] md:basis-1/3 lg:basis-1/4 mx-2 my-2 flex-grow flex-shrink min-w-[18rem] max-w-[27rem] w-full rounded-sm">
        <ArrowUpTrayIcon className="w-10 h-10" />
        <h2 className="text-lg lg:text-xl font-semibold mt-4 capitalize">
          Upload your first creation
        </h2>
        <h3 className="text-xs lg:text-sm text-secondary-header mt-2 text-center mx-8">
          Flex your skills as a developer and be apart of a growing community
        </h3>

        <DialogTrigger asChild>
          <Button
            className="mt-6"
            variant={"outline"}
            onClick={() => dispatch(true)}
          >
            Create a New Post
          </Button>
        </DialogTrigger>
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={`empty-post-${index}`}
          className={cn(
            `aspect-[4/3] md:basis-1/3 lg:basis-1/4 mx-2 my-2 flex-grow flex-shrink min-w-[18rem] max-w-[27rem] w-full rounded-sm"`,
            opacityTransition[index]
          )}
        >
          <></>
        </div>
      ))}
    </div>
  );
};

const EmptyProfileTemplate = () => {
  return (
    <div className="flex flex-col items-center pt-8">
      <CameraIcon className="w-16 h-16" />
      <h2 className="text-lg font-semibold mt-4 capitalize">No posts yet </h2>
    </div>
  );
};

export default Posts;
