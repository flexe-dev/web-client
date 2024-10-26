"use server";

interface Props {
  postId: string;
  type: PostType;
}

import { PostCommentProvider } from "@/components/context/User/PostCommentContext";
import { GetPostComments } from "@/controllers/CommentController";
import { ChildNodeProps, PostType } from "@/lib/interface";
import React, { Suspense } from "react";
import CommentInput from "./CommentInput";
import CommentPanel from "./CommentPanel";
import { CommentSortControl } from "./CommentSortControl";
import { CommentTree } from "./CommentTree";

const PostComments = async ({ postId, type }: Props) => {
  const comments = await GetPostComments(postId);
  const RenderedLayout: Record<PostType, React.FC<ChildNodeProps>> = {
    TEXT: ({ children }) => <TextCommentLayout>{children}</TextCommentLayout>,
    MEDIA: ({ children }) => (
      <MediaCommentLayout>{children}</MediaCommentLayout>
    ),
  };

  const RenderedCommentDepth: Record<PostType, [number, number]> = {
    TEXT: [6, 5],
    MEDIA: [4, 3],
  };

  const Component = RenderedLayout[type];
  return (
    <Suspense fallback={<>loading</>}>
      <PostCommentProvider comments={comments} postID={postId} type={type}>
        <Component>
          <CommentTree
            maxLevel={RenderedCommentDepth[type][0]}
            maxCommentReplies={RenderedCommentDepth[type][1]}
          />
        </Component>
      </PostCommentProvider>
    </Suspense>
  );
};

const MediaCommentLayout = ({ children }: ChildNodeProps) => {
  return (
    <CommentPanel>
      <div className="ml-4 mt-1">
        <CommentSortControl />
      </div>
      {children}
      <CommentInput />
    </CommentPanel>
  );
};

const TextCommentLayout = ({ children }: ChildNodeProps) => {
  return (
    <>
      <div className="h-fit border w-full mt-4 rounded-md overflow-hidden">
        <CommentInput />
      </div>
      <CommentSortControl />
      <div className="mt-4 rounded-md w-full border">{children}</div>
    </>
  );
};

export default PostComments;
