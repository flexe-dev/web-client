"use client";

import { PostInteractionProvider } from "@/components/context/User/PostInteractionContext";
import { PostToolsProvider } from "@/components/context/User/PostOptionToolProvider";
import { Card } from "@/components/ui/Shared/card";
import { Post, TextPost, UserDetails } from "@/lib/interface";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "../../Shared/button";
import { PostPreviewUserDetails } from "../Shared/PostUserDetails";
import { TextPostMetricsDisplay } from "./TextPostMetricsDisplay";

interface TextPostPreviewProps {
  user: UserDetails;
  callback: (post: TextPost) => void;
  post: TextPost;
  origin: string;
}

const TextPostPreview: FC<TextPostPreviewProps> = ({
  user,
  post,
  callback,
}) => {
  const router = useRouter();

  if (!post.id || !user) return null;
  const handlePostObjectUpdate = (updatedPost: Post) => {
    callback({
      ...post,
      ...updatedPost,
    });
  };

  return (
    <PostInteractionProvider
      key={`feed-text-${post.id}`}
      post={post}
      callback={handlePostObjectUpdate}
    >
      <Card className="relative w-full my-4 hover:bg-secondary/30 transition-colors overflow-hidden cursor-pointer">
        <div onClick={() => router.push(`/post/status/${post.id}`)}>
          <main className="pt-4 px-5">
            <PostPreviewUserDetails post={post} user={user} />
            <section className="ml-14 mb-8">{post.textContent.content}</section>
          </main>
        </div>
        <div className="w-full overflow-hidden">
          <TextPostMetricsDisplay />
        </div>
        <PostToolsProvider
          post={post}
          key={`text-post-preview-tools-${post.id}`}
        >
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={(e) => e.stopPropagation()}
            className="hover:border-primary absolute right-4 top-4  hover:border-2 h-7"
          >
            <EllipsisHorizontalIcon className="w-6 h-6" />
          </Button>
        </PostToolsProvider>
      </Card>
    </PostInteractionProvider>
  );
};

export default TextPostPreview;
