import React, { useEffect } from "react";
import { userProfileViewer } from "../context/UserProfileProvider";
import Link from "next/link";
import { ChildNodeProps, ClassNameProp } from "@/lib/interface";
import { cn } from "@/lib/utils";
import { ArrowUpTrayIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
const Posts = () => {
  const { userPosts } = userProfileViewer();
  const { userPosts: posts, loading } = userPosts;
  return (
    <>
      {posts.length > 0 && (
        <div className="w-full h-[5rem] border-2 my-4 rounded-sm">
          <Link
            className="h-full w-full flex justify-center items-center hover:bg-accent transition-colors"
            href={"/upload"}
          >
            <PlusCircleIcon className="w-7 h-7" />
            <p className="text-xl ml-2">Upload a new post</p>
          </Link>
        </div>
      )}

      {posts.length === 0 && <EmptyPostTemplate />}
    </>
  );
};

interface TileProps extends ChildNodeProps, ClassNameProp {}
const PostTile = ({ children, className }: TileProps) => {
  return (
    <div
      className={cn(
        "w-full aspect-[4/3] basis-[24rem] mx-2 my-2 min-w-[24rem] border-2 rounded-sm",
        className
      )}
    >
      {children}
    </div>
  );
};

const opacityTransition = [
  "bg-inverted-foreground/25",
  "bg-inverted-foreground/20",
  "bg-inverted-foreground/15",
  "bg-inverted-foreground/10",
  "bg-inverted-foreground/5",
];

const EmptyPostTemplate = () => {
  return (
    <div className="flex flex-wrap relative my-4 w-full">
      <PostTile className="border-dashed flex flex-col justify-center items-center ">
        <ArrowUpTrayIcon className="w-12 h-12" />
        <h2 className="text-xl font-semibold mt-4 capitalize">
          Upload your first creation
        </h2>
        <h3 className="text-sm text-secondary-header mt-2 text-center mx-8">
          Flex your skills as a developer and be apart of a growing community
        </h3>
        <Link href={"/upload"}>
          <Button className="mt-6" variant={"outline"}>
            Create a New Post
          </Button>
        </Link>
      </PostTile>
      {Array.from({ length: 5 }).map((_, index) => (
        <PostTile
          key={`empty-post-${index}`}
          className={cn(`border-transparent`, opacityTransition[index])}
        />
      ))}
    </div>
  );
};

export default Posts;
