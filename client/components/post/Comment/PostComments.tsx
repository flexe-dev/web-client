"use server";

interface Props {
  postId: string;
}

import { GetPostComments } from "@/controllers/PostController";

const PostComments = async ({ postId }: Props) => {
  const comments = await GetPostComments(postId);
  return <div></div>;
};

export default PostComments;
