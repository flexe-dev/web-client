"use server";

import { FindUserDisplayByUserId } from "@/controllers/UserController";
import { Post } from "@/lib/interfaces/postTypes";
import { FC, Suspense } from "react";
import { HeaderContent } from "./HeaderContent";
import { HeaderSkeleton } from "./HeaderSkeleton";

interface Props {
  post: Post;
}

export const PostDisplayHeader: FC<Props> = async ({ post }) => {
  const user = await FindUserDisplayByUserId(post.auxData.userID);

  if (!user) return null;

  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <HeaderContent post={post} account={user} />
    </Suspense>
  );
};
