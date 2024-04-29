"use client";

import UploadUserImages from "@/components/upload/UserUploadImage";
import React from "react";
import { PostContent } from "@prisma/client";
import { CreatePost } from "@/lib/interface";
import PostCreator from "@/components/creator/PostCreator";

const page = () => {
  const [uploadedFiles, setUploadedFiles] = React.useState<CreatePost[]>([]);

  return (
    <>
      {uploadedFiles.length === 0 ? (
        <PostCreator postContent={uploadedFiles} />
      ) : (
        <UploadUserImages setUploadedFiles={setUploadedFiles} />
      )}
    </>
  );
};

export default page;
