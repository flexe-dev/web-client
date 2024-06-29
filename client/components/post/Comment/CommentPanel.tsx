"use client";

import { motion } from "framer-motion";
import { Suspense, useState } from "react";
import PostComments from "./PostComments";
import { CommentLoading } from "./loading";

interface Props {
  postId: string;
}

const CommentPanel = ({ postId }: Props) => {
  const [panelOpen, setPanelOpen] = useState(false);
  return (
    <motion.section>
      <motion.div>
        <Suspense fallback={<CommentLoading />}>
          <PostComments postId={postId} />
        </Suspense>
      </motion.div>
    </motion.section>
  );
};

export default CommentPanel;
