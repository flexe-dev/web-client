"use client";

import DocumentCreator from "@/components/creator/PostCreator";
import UploadUserImages from "@/components/upload/UserUploadImage";
import { PostUserMedia } from "@/lib/interfaces/documentTypes";
import React from "react";

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
