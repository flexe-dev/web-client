"use client";

import { PostInteractionProvider } from "@/components/context/PostInteractionContext";
import { UserTextPost } from "@/lib/interface";
import { TextPostMetricsDisplay } from "./TextPostMetricsDisplay";

interface Props {
  post: UserTextPost;
}

export const TextDisplayContent = ({ post }: Props) => {
  return (
    <div className="relative w-full flex flex-col min-h-[10rem] border-b">
      <div className="p-4 h-auto flex-grow">{post.textpost}</div>
      <footer>
       
          <TextPostMetricsDisplay />
     
      </footer>
    </div>
  );
};
