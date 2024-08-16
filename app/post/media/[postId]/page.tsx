"use server";

import ErrorPage from "@/components/Error";
import PostDisplayWrapper from "@/components/ui/Posts/media/PostDisplayWrapper";
import { LoadingPost } from "@/components/ui/Posts/media/loading";
import { getPostById } from "@/controllers/PostController";
import { UserPost } from "@/lib/interface";
import { Suspense } from "react";

interface Props {
  params: {
    postId: string;
  };
}
const page = async ({ params }: Props) => {
  const { postId } = params;
  const post = (await getPostById(postId, "MEDIA")) as UserPost | undefined;
  if (!post) return <ErrorPage />;

  return (
    <div className="relative flex">
      <Suspense fallback={<LoadingPost />}>
        <PostDisplayWrapper post={post} />
      </Suspense>
    </div>
  );
};

export default page;
