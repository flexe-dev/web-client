"use client";

import { ChildNodeProps, ClassNameProp, UserPost } from "@/lib/interface";
import { cn } from "@/lib/utils";
import { ArrowUpTrayIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React, { SetStateAction, useState } from "react";
import { userProfileViewer } from "../context/UserProfileProvider";
import PostCreateDialog from "../creator/PostCreateDialog";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

const Posts = () => {
  const { userPosts } = userProfileViewer();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { userPosts: posts, loading } = userPosts;
  return (
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

        {posts.length === 0 ? (
          <EmptyPostTemplate dispatch={setOpenDialog} />
        ) : (
          <UserPosts posts={posts} />
        )}
      </div>
      <PostCreateDialog dispatch={setOpenDialog} />
    </Dialog>
  );
};

interface TileProps extends ChildNodeProps, ClassNameProp {}
const PostTile = ({ children, className }: TileProps) => {
  return (
    <div
      className={cn(
        "aspect-[4/3] w-full mx-auto my-2 min-w-[18rem] border-2 rounded-sm hover:brightness-50 transition-all",
        className
      )}
    >
      {children}
    </div>
  );
};

const opacityTransition = [
  "bg-inverted-foreground/15",
  "bg-inverted-foreground/[12.5%]",
  "bg-inverted-foreground/10",
  "bg-inverted-foreground/[7.5%]",
  "bg-inverted-foreground/5",
];

interface UserPostsProps {
  posts: UserPost[];
}

const UserPosts = (posts: UserPostsProps) => {
  return (
    <div className="grid p-8 md:p-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 justify-center  relative my-4 w-full ">
      {posts.posts.map((post, index) => (
        <PostTile key={post.id}>
          <Link className="w-full h-full" href={`/post/media/${post.id}`}>
            <div className="relative w-full h-full">
              <Image
                src={
                  post.auxData.thumbnail ??
                  process.env.NEXT_PUBLIC_DEFAULT_IMAGE
                }
                fill
                alt={`Post ${post.auxData.title} cover image`}
                objectFit="cover"
              />
            </div>
          </Link>
        </PostTile>
      ))}
    </div>
  );
};
interface Props {
  dispatch: React.Dispatch<SetStateAction<boolean>>;
}

const EmptyPostTemplate = ({ dispatch }: Props) => {
  return (
    <div className="flex flex-wrap justify-center relative my-4 w-full">
      <PostTile className="border-dashed flex flex-col justify-center items-center ">
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
      </PostTile>
      {Array.from({ length: 5 }).map((_, index) => (
        <PostTile
          key={`empty-post-${index}`}
          className={cn(`border-transparent`, opacityTransition[index])}
        >
          <></>
        </PostTile>
      ))}
    </div>
  );
};

export default Posts;
