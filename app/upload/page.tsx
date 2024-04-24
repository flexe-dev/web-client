"use client";

import UploadUserImages from "@/components/upload/UserUploadImage";
import React from "react";
import { PostContent } from "@prisma/client";
import PostCreator from "@/components/creator/PostCreator";

export type PostCreationContent = Omit<PostContent, "id">;
export interface CreatePost {
  content: PostCreationContent;
  file: File;
}

const page = () => {
  const [uploadedFiles, setUploadedFiles] = React.useState<CreatePost[]>([]);

  return (
    <>
      {uploadedFiles.length > 0 ? (
        <PostCreator postContent={uploadedFiles} />
      ) : (
        <UploadUserImages setUploadedFiles={setUploadedFiles} />
      )}
    </>
  );
};

export default page;
