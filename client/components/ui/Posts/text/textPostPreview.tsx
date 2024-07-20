"use client";

import { PostToolsProvider } from "@/components/context/PostOptionToolProvider";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardFooter } from "@/components/ui/card";
import { UserTextPost } from "@/lib/interface";
import {
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { User } from "next-auth";
import Link from "next/link";
import { timeAgo } from "../../../../lib/dateutils";
import { Button } from "../../button";

interface TextPostPreviewProps {
  user: User;
  post: UserTextPost;
}

const TextPostPreview = (props: TextPostPreviewProps) => {
  const { post, user } = props;
  if (!post.id || !user) return null;

  return (
    <Card className="relative w-full my-4 hover:bg-secondary transition-colors">
      <Link href={`/post/status/${post.id}`}>
        <main className="p-4">
          <section className="flex space-x-1 items-center p-2 justify-between">
            <div className="flex">
              <Avatar className="w-10 h-10 mr-2">
                <AvatarImage
                  className="object-cover"
                  src={user.image ?? process.env.NEXT_PUBLIC_FALLBACK_PHOTO}
                />
              </Avatar>
              <div className="flex items-center space-x-2">
                <div>{user.username}</div>
              </div>
              <div className="flex items-center ml-2 space-x-2">
                <div className="text-secondary-header">
                  {timeAgo(post.createdAt)}
                </div>
              </div>
            </div>
          </section>

          <section className="ml-14">{post.textpost}</section>
          <CardFooter className="py-3 ml-8 justify-left space-x-4">
            <div className="flex space-x-2 items-center">
              <span>{post.externalData.likeCount}</span>
              <HandThumbUpIcon className="w-4 h-4" />
            </div>
            <div className="flex space-x-2 items-center">
              <span>{post.externalData.commentCount}</span>
              <ChatBubbleOvalLeftIcon className="w-4 h-4" />
            </div>
          </CardFooter>
        </main>
      </Link>
      <PostToolsProvider postId={post.id} postType="TEXT">
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
  );
};

export default TextPostPreview;
