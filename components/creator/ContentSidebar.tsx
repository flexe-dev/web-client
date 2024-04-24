"use client";

import React, { useState } from "react";
import { CreatePost } from "@/app/upload/page";
import { cn } from "@/lib/utils";

interface Props {
  postContent: CreatePost[];
}

const ContentSidebar = (props: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <aside
      className={cn(
        `h-screen fixed lg:sticky top-0 left-0  border-r-2 bg-background `,
        sidebarOpen ? "min-w-[20rem] max-w-[20rem]" : "w-[3rem]"
      )}
    ></aside>
  );
};

export default ContentSidebar;
