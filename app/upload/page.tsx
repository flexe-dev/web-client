"use client";

import UploadUserImages from "@/components/upload/UserUploadImage";
import React from "react";

const page = () => {
  const [uploadedImages, setUploadedImages] = React.useState<File[]>([]);
  
  return (
    <div className="h-[100dvh] flex flex-col items-center mx-12 lg:mx-24 my-6 lg:my-12">
      <UploadUserImages setUploadedImages={setUploadedImages} />
    </div>
  );
};

export default page;
