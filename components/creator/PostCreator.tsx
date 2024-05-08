import React from "react";
import { CreatePost } from "@/lib/interface";
import ContentSidebar, { dropAnimationConfig } from "./ContentSidebar";
import { PostDragProvider, useBlockDrag } from "../context/PostDragProvider";
import PostContent from "./PostContent";
import { PostCreatorProvider } from "../context/PostCreatorProvider";
import { DragOverlay } from "@dnd-kit/core";
import { Blocks } from "lucide-react";
import { BlockID } from "./blocks/Blocks";

interface Props {
  postContent: CreatePost[];
}

const PostCreator = (props: Props) => {
  return (
    <PostCreatorProvider>
      <div className="w-full flex relative">
        <PostDragProvider>
          <PostContent postContent={props.postContent} />
        </PostDragProvider>
      </div>
    </PostCreatorProvider>
  );
};

export default PostCreator;
