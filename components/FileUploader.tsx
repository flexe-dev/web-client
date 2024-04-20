import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";
interface Props {
  fileSizeLimit?: number;
  fileQuantityLimit?: number;
  onFileUpload: (file: File[]) => void;
  className?: string;
}

export const FileUploader = (props: Props) => {
  const { onFileUpload, className, fileQuantityLimit, fileSizeLimit } = props;

  const [isDragging, setIsDragging] = useState(false);

  const handleFileValidation = (files: File[]): boolean => {
    if (fileQuantityLimit && files.length > fileQuantityLimit) {
      toast.error(`You can only upload ${fileQuantityLimit} files at a time`);
      return false;
    }
    files.forEach((file) => {
      if (fileSizeLimit && file.size > fileSizeLimit) {
        toast.error(
          `File ${file.name} is too large. Maximum file size is ${fileSizeLimit} bytes`
        );
        return false;
      }
    });

    return true;
  };

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
    onFileUpload(Object.values(files));
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
        Add Files Here
      </label>
      <Input type="file" className="hidden" onChange={handleUpload} id="file" />
    </>
  );
};
