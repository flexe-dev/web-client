"use server";

import ErrorPage from "@/components/Error";
import PostDisplayWrapper from "@/components/post/PostDisplayWrapper";
import { LoadingPost } from "@/components/post/loading";
import { getPostById } from "@/controllers/PostController";
import { Suspense } from "react";

interface Props {
  params: {
    postId: string;
  };
}
const page = async ({ params }: Props) => {
  const { postId } = params;
  const post = await getPostById(postId as string);
  if (!post) return <ErrorPage />;

  return (
    <>
      <Suspense fallback={<LoadingPost />}>
        <PostDisplayWrapper post={post} />
      </Suspense>
    </>
  );
};

export default page;
