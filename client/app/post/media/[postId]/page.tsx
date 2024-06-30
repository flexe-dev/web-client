"use server";

import ErrorPage from "@/components/Error";
import PostDisplayWrapper from "@/components/ui/Posts/media/PostDisplayWrapper";
import { LoadingPost } from "@/components/ui/Posts/media/loading";
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
