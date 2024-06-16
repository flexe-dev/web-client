"use client";

import { UserPost } from "@/lib/interface";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EyeIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import PostComments from "./PostComments";

interface Props {
  selectedPost: UserPost;
}

const PostAuxData = (props: Props) => {
  const { selectedPost } = props;
  return (
    <div className="min-w-[17rem] max-w-[17rem] h-full border-r-2 flex flex-col sticky top-0 bottom-0 left-0">
      <div className="flex-grow h-auto overflow-y-auto" id="comments">
        <PostComments />
      </div>
      <div className="border-t-2 sticky bottom-0 py-4 flex justify-between px-8">
        <div className="flex items-center">
          <EyeIcon className="w-4 h-4" />
          <span className="ml-1">{selectedPost.externalData.viewCount}</span>
        </div>
        <div className="flex items-center">
          <HandThumbUpIcon className="w-4 h-4" />
          <span className="ml-1">{selectedPost.externalData.likeCount}</span>
        </div>
        <div className="flex items-center h-1/4">
          <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
          <span className="ml-1">{selectedPost.externalData.commentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PostAuxData;
