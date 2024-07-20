"use server";

import { GetPostComments } from "@/controllers/PostController";

interface Props {
  postId: string;
}



const PostComments = async ({ postId }: Props) => {
  const comments = await GetPostComments(postId);
  return (
   <></>
  );
};

export default PostComments;
