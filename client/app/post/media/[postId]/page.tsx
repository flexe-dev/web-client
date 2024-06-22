"use server";

import ErrorPage from "@/components/Error";
import DisplayPost from "@/components/post/DisplayPost";
import PostDisplayWrapper from "@/components/post/PostDisplayWrapper";
import { getPostById } from "@/controllers/PostController";

interface Props {
  params: {
    postId: string;
  };
}
const page = async ({ params }: Props) => {
  const { postId } = params;
  const post = await getPostById(postId as string);
  if (!post) return <ErrorPage />;

  return <PostDisplayWrapper post={post}/>
};

export default page;
