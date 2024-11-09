"use server";

import ErrorPage from "@/components/Error";
import PostDisplayWrapper from "@/components/ui/Posts/Media/PostDisplayWrapper";
import { LoadingPost } from "@/components/ui/Posts/Media/loading";
import { getMediaPostById } from "@/controllers/PostController";
import { MediaPost } from "@/lib/interfaces/postTypes";
import { Suspense } from "react";

interface Props {
  params: {
    postId: string;
  };
}
const page = async ({ params }: Props) => {
  const { postId } = params;
  const post: MediaPost | undefined = await getMediaPostById(postId);
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
