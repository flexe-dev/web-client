"use server";

interface Props {
  post: Post;
}

import { PostCommentProvider } from "@/components/context/User/PostComments/PostCommentContext";
import { GetPostComments } from "@/controllers/CommentController";
import { baseAuthOptions } from "@/lib/auth/authOptions";
import { CommentLimitations } from "@/lib/interfaces/commentTypes";
import { ChildNodeProps } from "@/lib/interfaces/componentTypes";
import { Post, PostType } from "@/lib/interfaces/postTypes";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";
import CommentInput from "./Comment/CommentInput";
import CommentPanel from "./Comment/CommentPanel";
import { CommentSortControl } from "./Comment/CommentSortControl";
import { CommentTree } from "./Comment/Tree/CommentTree";

const PostComments = async ({ post }: Props) => {
  const session = await getServerSession(baseAuthOptions);

  if (!post.id) return null;

  const { id, postType } = post;
  const comments = await GetPostComments(id, session?.token);

  if (!comments) return null;

  const RenderedLayout: Record<PostType, React.FC<ChildNodeProps>> = {
    TEXT: ({ children }) => <TextCommentLayout>{children}</TextCommentLayout>,
    MEDIA: ({ children }) => (
      <MediaCommentLayout>{children}</MediaCommentLayout>
    ),
  };

  const RenderedCommentDepth: Record<PostType, CommentLimitations> = {
    TEXT: {
      // Maximum depth of comment replies
      level: 6,
      // Maximum number of comment replies
      replies: 5,
    },
    MEDIA: {
      // Maximum depth of comment replies
      level: 4,
      // Maximum number of comment replies
      replies: 3,
    },
  };

  const CommentLayout = RenderedLayout[postType];
  return (
    <Suspense fallback={<>loading</>}>
      <PostCommentProvider comments={comments} post={post}>
        <CommentLayout>
          <CommentTree sizeLimits={RenderedCommentDepth[postType]} />
        </CommentLayout>
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
      <div className="mt-4 pt-4 rounded-md w-full border">{children}</div>
    </>
  );
};

export default PostComments;
