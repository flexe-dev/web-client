"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Button } from "./button";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
const GallerySidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const desktop = useMediaQuery({ query: "(min-width: 1024px)" });
  useEffect(() => {
    setSidebarOpen(desktop);
  }, [desktop]);
  return (
    <aside
      className={cn(
        "h-screen border-r transition-all ",
        sidebarOpen ? "w-[20rem] xl:w-[25rem] sticky left-0 top-0" : "w-0"
      )}
    >
      <Button
        onClick={() => setSidebarOpen((prev) => !prev)}
        variant={"outline"}
        className={cn(
          "fixed mt-2 transition-all",
          sidebarOpen ? "left-[15rem] xl:left-[20rem]" : "left-[1rem]"
        )}
      >
        <Bars3CenterLeftIcon className="w-8 h-8" />
      </Button>
    </aside>
  );
};

export default GallerySidebar;
