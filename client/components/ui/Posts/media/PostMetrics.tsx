"use client";

import { Button } from "@/components/ui/button";
import { UserPost } from "@/lib/interface";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  post: UserPost;
}

const PostMetrics = ({ post }: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-col -translate-x-24 translate-y-[16rem] z-[99] h-[1px] space-y-3">
      <Button
        className="flex flex-col items-center justify-center rounded-full w-[3.75rem] h-[3.75rem] bg-background hover:bg-background/50 text-primary border shadow-md shadow-neutral-600"
        onClick={() => {}}
      >
        <HandThumbUpIcon className="w-6 h-6" />
        <span className="mt-1">{post.externalData.likeCount}</span>
      </Button>
      <Button className="rounded-full w-[3.75rem] h-[3.75rem] bg-background hover:bg-background/50 text-primary">
        <Link
          href={window.location.href}
          className="flex flex-col items-center justify-center"
        >
          <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
          <span className="mt-1">{post.externalData.commentCount}</span>
        </Link>
      </Button>
      <Button
        className="flex flex-col items-center justify-center rounded-full w-[3.75rem] h-[3.75rem] bg-background hover:bg-background/50 text-primary"
        onClick={() => {}}
      >
        <BookmarkIcon className="w-6 h-6" />
        <span className="mt-1">{post.externalData.saveCount}</span>
      </Button>
    </div>
  );
};

export default PostMetrics;
