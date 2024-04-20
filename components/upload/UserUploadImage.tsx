"use client";

const UploadUserImages = () => {
  const handleFileUpload = (files: File[]) => {
    console.log(files);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold">
        Lets get started with your new post
      </h1>
      <h2 className="text-secondary-header text-xl max-w-screen-lg text-center mt-4 font-semibold">
        <div>
          Drag and drop photos to help showcase your work to the fullest extent
        </div>
        <div>
          {"("}more can be uploaded at any given time{")"}
        </div>
      </h2>
    </div>
  );
};

export default UploadUserImages;
