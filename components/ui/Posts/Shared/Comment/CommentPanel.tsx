"use client";

import { ChildNodeProps } from "@/lib/interfaces/componentTypes";
import { cn } from "@/lib/util/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { FC, useState } from "react";
import { PostDisplayMetrics } from "../../Media/PostDisplayMetrics";

const CommentPanel: FC<ChildNodeProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const commentPanelState = searchParams.get("c");
  const [panelOpen, setPanelOpen] = useState(
    commentPanelState?.includes("t") ?? false
  );
  return (
    <motion.aside
      className={cn(
        "border-r fixed xl:sticky duration-300 ease-in-out z-[80] md:z-[40] bg-background h-screen-without-header top-[5rem] left-0 transition-all",
        panelOpen ? "w-3/4 md:w-3/5 xl:w-1/2" : "w-0 md:w-[4rem]"
      )}
    >
      <AnimatePresence mode="wait">
        {panelOpen && (
          <motion.div
            className="flex flex-col h-full truncate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.75 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <PostDisplayMetrics
        commentOnClick={() => setPanelOpen(!panelOpen)}
        commentPanelOpen={panelOpen}
      />
    </motion.aside>
  );
};

export default CommentPanel;
