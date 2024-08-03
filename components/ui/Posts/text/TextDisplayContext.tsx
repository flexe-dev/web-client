"use client";

import { UserTextPost } from "@/lib/interface";

interface Props {
  post: UserTextPost;
}

export const TextDisplayContent = ({ post }: Props) => {
  return (
    <div className="relative w-full flex flex-col min-h-[10rem] border-b">
      <div className="p-4 h-auto flex-grow">{post.textpost}</div>
      <div className="h-[3rem] border-t p-2">Metrics</div>
    </div>
  );
};
