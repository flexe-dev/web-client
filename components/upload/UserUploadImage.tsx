"use client";

import { toast } from "sonner";
import { FileUploader } from "../FileUploader";
import { PostContent, PostContentType } from "@prisma/client";
import { PostCreationContent } from "@/app/upload/page";
import { CreatePost } from "@/app/upload/page";
interface Props {
  setUploadedFiles: React.Dispatch<React.SetStateAction<CreatePost[]>>;
}

const mbRatio = 1000000;

const UploadUserImages = ({ setUploadedFiles }: Props) => {
  const handleFileUpload = (files: File[]) => {
    //Only Accept Images of Min Resolution 1440px x 990px
    let validFiles: CreatePost[] = [];
    files.forEach((file) => {
      if (file.type.includes("image")) {
        const content = handleImageValidation(file);
        if (content) validFiles.push(content);
        return;
      }
      if (file.type.includes("video")) {
        const content = handleVideoValidation(file);
        if (content) validFiles.push(content);
        return;
      }

      toast.message(file.name, {
        description:
          "This image has not been included as it is not an Image or Video file",
      });
    });
  };

  const handleImageValidation = (file: File): CreatePost | undefined => {
    //Size Validation
    if (file.size > 10 * mbRatio) {
      toast.message(file.name, {
        description: "This image is too large to be uploaded",
      });
      return;
    }
    //Resolution Validation
    const img = new Image();
    img.onload = () => {
      if (img.width < 1440 || img.height < 990) {
        toast.message(file.name, {
          description: "This image is too small to be uploaded",
        });
        return;
      }
    };
    img.src = URL.createObjectURL(file);

    const content: PostCreationContent = {
      userPostId: null,
      location: img.src,
      width: img.width,
      height: img.height,
      format: file.type.includes("gif")
        ? PostContentType.GIF
        : PostContentType.IMAGE,
    };
    return {
      content,
      file,
    };
  };

  const handleVideoValidation = (file: File): CreatePost | undefined => {
    //Size Validation
    if (file.size > 15 * mbRatio) {
      toast.message(file.name, {
        description: "This video is too large to be uploaded",
      });
      return;
    }
    //Resolution Validation
    const video = document.createElement("video");
    video.onloadedmetadata = () => {
      if (video.videoWidth < 1440 || video.videoHeight < 990) {
        toast.message(file.name, {
          description: "This video is too small to be uploaded",
        });
        return;
      }
    };

    video.src = URL.createObjectURL(file);
    const content: PostCreationContent = {
      userPostId: null,
      location: video.src,
      width: video.width,
      height: video.height,
      format: PostContentType.VIDEO,
    };

    return {
      content,
      file,
    };
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl lg:text-4xl text-center font-bold">
        Lets get started with your new post
      </h1>
      <h2 className="text-secondary-header text-lg lg:text-xl lg:max-w-screen-lg text-center mt-4 font-semibold">
        <div>
          Drag and drop photos to help showcase your work to the fullest extent
        </div>
        <div className="mt-4 text-base">
          {"("}more can be uploaded at any given time{")"}
        </div>
      </h2>
      <FileUploader
        className="max-w-screen-xl mt-8 h-96"
        onFileUpload={handleFileUpload}
        fileSizeLimit={1000000}
      >
        Hey
      </FileUploader>
    </div>
  );
};

export default UploadUserImages;
