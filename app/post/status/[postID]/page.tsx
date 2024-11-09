"use server";

import ErrorPage from "@/components/Error";
import { PostDisplayHeader } from "@/components/ui/Posts/Shared/Header/PostDisplayHeader";
import { TextPostDisplay } from "@/components/ui/Posts/Text/TextPostDisplay";
import { Skeleton } from "@/components/ui/Shared/skeleton";
import { getTextPostById } from "@/controllers/PostController";
import { TextPost } from "@/lib/interfaces/postTypes";
import { Suspense } from "react";

interface Props {
  params: {
    postID: string;
  };
}

const page = async ({ params }: Props) => {
  const { postID } = params;
  const post: TextPost | undefined = await getTextPostById(postID);

  if (!post || !post.id) return <ErrorPage />;

  return (
    <div className="relative flex flex-col items-center mx-auto w-full md:w-3/4 lg:w-1/2 h-full">
      <PostDisplayHeader post={post} />
      <Suspense fallback={<Skeleton className="mt-4 h-[10rem]" />}>
        <TextPostDisplay post={post} />
      </Suspense>
    </div>
  );
};

export default page;
