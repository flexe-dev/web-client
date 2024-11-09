
import { cn } from "@/lib/util/utils";
import React, { useState } from "react";
import { Input } from "./ui/Shared/input";
import { ChildNodeProps } from "@/lib/interfaces/componentTypes";

interface Props extends ChildNodeProps {
  fileSizeLimit?: number;
  fileQuantityLimit?: number;
  onFileUpload: (file: File[]) => void;
  className?: string;
}

export const FileUploader = (props: Props) => {
  const { onFileUpload, className, children } = props;

  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files) onFileUpload(Object.values(files));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) onFileUpload(Object.values(files));
  };

  return (
    <>
      <label
        htmlFor="file"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center transition-colors justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer",
          className,
          isDragging && "border-primary"
        )}
      >
        {children ?? <p>Add Files Here</p>}
      </label>
      <Input type="file" className="hidden" onChange={handleUpload} id="file" />
    </>
  );
};
