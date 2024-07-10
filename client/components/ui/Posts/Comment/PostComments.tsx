"use server";

interface Props {
  postId: string;
}

import { PostCommentProvider } from "@/components/context/PostCommentContext";
import { GetPostComments } from "@/controllers/PostController";
import { Suspense } from "react";
import CommentInput from "./CommentInput";
import CommentPanel from "./CommentPanel";
import { CommentTree } from "./CommentTree";

const PostComments = async ({ postId }: Props) => {
  const comments = await GetPostComments(postId);
  return (
    <Suspense fallback={<>loading</>}>
      <PostCommentProvider comments={comments} postID={postId}>
        <CommentPanel>
          <CommentTree />
          <CommentInput />
        </CommentPanel>
      </PostCommentProvider>
    </Suspense>
  );
};

export default PostComments;
