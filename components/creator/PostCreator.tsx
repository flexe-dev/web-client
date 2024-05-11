import React from "react";
import { PostUserMedia } from "@/lib/interface";
import { PostDragProvider } from "../context/PostDragProvider";
import PostContent from "./PostContent";
import { PostCreatorProvider } from "../context/PostCreatorProvider";

interface Props {
  postContent: PostUserMedia[];
}

const PostCreator = (props: Props) => {
  return (
    <PostCreatorProvider content={props.postContent}>
      <div className="w-full flex relative">
        <PostDragProvider>
          <PostContent/>
        </PostDragProvider>
      </div>
    </PostCreatorProvider>
  );
};

export default PostCreator;
