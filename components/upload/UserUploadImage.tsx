"use client";

import { toast } from "sonner";
import { FileUploader } from "../FileUploader";

interface Props {
  setUploadedImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const mbRatio = 1000000;

const UploadUserImages = (props: Props) => {
  const handleFileUpload = (files: File[]) => {
    //Only Accept Images of Min Resolution 1440px x 990px
    files.forEach((file) => {
      if (file.type.includes("image")) {
        handleImageValidation(file);
        return;
      }
      if (file.type.includes("video")) {
        handleVideoValidation(file);
        return;
      }

      toast.message(file.name, {
        description:
          "This image has not been included as it is not an Image or Video file",
      });
    });
  };

  const handleImageValidation = (file: File) => {
    //Size Validation
    if (file.size > 10 * mbRatio) {
      toast.message(file.name, {
        description: "This image is too large to be uploaded",
      });
    }
    //Resolution Validation
    const img = new Image();
    img.onload = () => {
      if (img.width < 1440 || img.height < 990) {
        toast.message(file.name, {
          description: "This image is too small to be uploaded",
        });
      }
    };
    img.src = URL.createObjectURL(file);
    console.log(img.src);
  };

  const handleVideoValidation = (file: File) => {
    //Size Validation
    if (file.size > 15 * mbRatio) {
      toast.message(file.name, {
        description: "This video is too large to be uploaded",
      });
    }
    //Resolution Validation
    const video = document.createElement("video");
    video.onloadedmetadata = () => {
      if (video.videoWidth < 1440 || video.videoHeight < 990) {
        toast.message(file.name, {
          description: "This video is too small to be uploaded",
        });
      }
    };
    video.src = URL.createObjectURL(file);
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
