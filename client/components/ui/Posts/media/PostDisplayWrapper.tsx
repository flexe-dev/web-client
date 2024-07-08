"use client";

import { UserPost } from "@/lib/interface";
import { motion } from "framer-motion";
import ErrorPage from "../../../Error";
import DisplayPost from "./DisplayPost";

interface Props {
  post: UserPost;
}

const PostDisplayWrapper = ({ post }: Props) => {
  if (!post.id) return <ErrorPage />;

  return (
    <motion.div key={"post-wrapper"} layout>
        <DisplayPost post={post} />
    </motion.div>
  );
};

export default PostDisplayWrapper;
