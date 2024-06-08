"use client";

import UploadUserImages from "@/components/upload/UserUploadImage";
import React from "react";
import DocumentCreator from "@/components/creator/PostCreator";
import { PostUserMedia } from "@/lib/interface";

const page = () => {
  const [uploadedFiles, setUploadedFiles] = React.useState<PostUserMedia[]>([]);

  return (
    <>
      {uploadedFiles.length > 0 ? (
        <>
          <DocumentCreator postContent={uploadedFiles} />
        </>
      ) : (
        <UploadUserImages setUploadedFiles={setUploadedFiles} />
      )}
    </>
  );
};

export default page;
