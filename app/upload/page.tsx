import UploadUserImages from "@/components/upload/UserUploadImage";
import React from "react";

const page = () => {
  return (
    <div className="h-[100dvh] flex flex-col items-center mx-24 my-12">
      <UploadUserImages />
    </div>
  );
};

export default page;
