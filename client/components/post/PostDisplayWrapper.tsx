"use client";

import { UserPost } from "@/lib/interface";
import ErrorPage from "../Error";
import CommentPanel from "./Comment/CommentPanel";
import DisplayPost from "./DisplayPost";

interface Props {
  post: UserPost;
}

const PostDisplayWrapper = ({ post }: Props) => {
  if (!post.id) return <ErrorPage />;

  return (
    <>
      <CommentPanel postId={post.id} />
      <div className="w-full h-full flex-col">
        <DisplayPost post={post} />
      </div>
    </>
  );
};

export default PostDisplayWrapper;
