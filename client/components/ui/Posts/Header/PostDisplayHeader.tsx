"use server";

import { FindAccountByUserId } from "@/controllers/UserController";
import { PostType } from "@/lib/interface";
import { Suspense } from "react";
import { HeaderContent } from "./HeaderContent";
import { HeaderSkeleton } from "./HeaderSkeleton";

interface Props {
  userID: string;
  datePosted: Date;
  updatedDate?: Date;
  type: PostType;
  postID: string;
}

export const PostDisplayHeader = async (props: Props) => {
  const { userID } = props;
  const account = await FindAccountByUserId(userID);

  if (!account) return null;

  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <HeaderContent {...props} account={account} />
    </Suspense>
  );
};