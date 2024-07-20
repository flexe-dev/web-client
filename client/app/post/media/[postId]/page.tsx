"use server";

import ErrorPage from "@/components/Error";
import { CommentPanelLoading } from "@/components/ui/Posts/Comment/Loading/CommentPanelLoading";
import PostComments from "@/components/ui/Posts/Comment/PostComments";
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
      <Suspense fallback={<CommentPanelLoading type="MEDIA" />}>
        <PostComments postId={postId} type="MEDIA" />
      </Suspense>

      <Suspense fallback={<LoadingPost />}>
        <PostDisplayWrapper post={post} />
      </Suspense>
    </div>
  );
};

export default page;
