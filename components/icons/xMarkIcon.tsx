import React from "react";
import { cn } from "@/lib/utils";
import { ClassNameProp } from "@/lib/interface";

function XMarkIcon(props: ClassNameProp) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-6 h-6", props.className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}

export default XMarkIcon;
