"use server";

interface Props {
  postId: string;
}

import { PostCommentProvider } from "@/components/context/PostCommentContext";
import { GetPostComments } from "@/controllers/PostController";
import { CommentDisplay } from "./CommentDisplay";

const PostComments = async ({ postId }: Props) => {
  const comments = await GetPostComments(postId);
  return (
    <PostCommentProvider comments={comments} postID={postId}>
      <CommentDisplay />
    </PostCommentProvider>
  );
};

export default PostComments;
