"use client";

import { Button } from "@/components/ui/button";
import { ChildNodeProps } from "@/lib/interface";
import { cn } from "@/lib/utils";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import CommentInput from "./CommentInput";

interface Props extends ChildNodeProps {}

const CommentPanel = ({ children }: Props) => {
  const [panelOpen, setPanelOpen] = useState(true);
  return (
    <motion.aside
      className={cn(
        "border-r h-screen fixed xl:sticky duration-300 ease-in-out z-[40] bg-background top-[5rem] left-0 transition-all",
        panelOpen ? "w-5/6 md:w-1/2 xl:w-2/5 " : "w-0 md:w-[4rem]"
      )}
    >
      <AnimatePresence mode="wait">
        {panelOpen && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            <motion.div
              initial={{ opacity: 0, width: "50%" }}
              animate={{
                opacity: 1,
                width: "100%",
                transition: { duration: 0.5 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="h-screen truncate"
            >
              {children}
            </motion.div>
            <CommentInput />
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        className="fixed bottom-12 left-6 md:left-auto md:-right-8 md:absolute flex flex-col items-center justify-center md:top-[calc(50%-5rem)] h-16 w-16 backdrop-blur-xl bg-primary/20 hover:bg-background/50 md:bg-background border-2 border-primary md:border-border rounded-full group"
        variant={"outline"}
        size={"icon"}
        onClick={() => setPanelOpen(!panelOpen)}
      >
        <AnimatePresence mode="wait">
          {panelOpen ? (
            <motion.div
              key={"panel-open-icon"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.15 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <ChevronLeftIcon className="h-7 transition-opacity" />
            </motion.div>
          ) : (
            <motion.div
              key={"panel-closed-icon"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.15 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <ChatBubbleOvalLeftEllipsisIcon className="stroke-primary h-7 md:stroke-muted-foreground group-hover:stroke-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </motion.aside>
  );
};

export default CommentPanel;
