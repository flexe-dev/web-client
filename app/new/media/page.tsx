"use client";

import UploadUserImages from "@/components/upload/UserUploadImage";
import React from "react";
import { PostContent } from "@prisma/client";
import { CreatePost } from "@/lib/interface";
import PostCreator from "@/components/upload/PostCreator";

const page = () => {
  const [uploadedFiles, setUploadedFiles] = React.useState<CreatePost[]>([]);

  return (
    <div className="h-[100dvh] flex flex-col items-center mx-12 lg:mx-24 my-6 lg:my-12">
      {uploadedFiles.length > 0 ? (
        <PostCreator postContent={uploadedFiles} />
      ) : (
        <UploadUserImages setUploadedFiles={setUploadedFiles} />
      )}
    </div>
  );
};

export default page;
