import ErrorPage from "@/components/Error";
import PostComments from "@/components/ui/Posts/Comment/PostComments";
import { PostDisplayHeader } from "@/components/ui/Posts/Header/PostDisplayHeader";
import { TextPostDisplay } from "@/components/ui/Posts/text/TextPostDisplay";
import { TextPostSkeleton } from "@/components/ui/Posts/text/TextPostSkeleton";
import { getPostById } from "@/controllers/PostController";
import { UserTextPost } from "@/lib/interface";
import { Suspense } from "react";

interface Props {
  params: {
    postID: string;
  };
}

const page = async ({ params }: Props) => {
  const { postID } = params;
  const post = (await getPostById(postID, "TEXT")) as UserTextPost | undefined;

  if (!post || !post.id) return <ErrorPage />;

  return (
    <div className="relative flex flex-col items-center mx-auto w-full md:w-3/4 lg:w-1/2 h-full">
      <PostDisplayHeader
        datePosted={post.createdAt}
        updatedDate={post.updatedAt}
        userID={post.userID}
        postID={post.id!}
        type="TEXT"
      />
      <Suspense fallback={<TextPostSkeleton />}>
        <TextPostDisplay post={post} />
      </Suspense>
      <Suspense fallback={"Loading..."}>
        <PostComments postId={post.id} type="TEXT" />
      </Suspense>
    </div>
  );
};

export default page;
