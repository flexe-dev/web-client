"use client";

import { FileUploader } from "@/components/FileUploader";
import { useProfileViewer } from "@/components/context/UserProfileProvider";
import { Button } from "@/components/ui/button";
import { UploadProfileReadMe } from "@/controllers/UserController";
import readMeTemplate from "@/lib/baseReadme";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import MarkdownPrevew from "@uiw/react-markdown-preview";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import MarkdownEditor from "./mdEditor";
const ReadMe = () => {
  const { fetchedProfile, fetchedUser, setFetchedProfile, isOwnProfile } =
    useProfileViewer();

  const readMe = fetchedProfile.profile?.readMe;
  const { user, loading: userLoading } = fetchedUser;
  const { profile, loading: profileLoading } = fetchedProfile;

  if (!user || !profile) return null;
  const uploadReadMe = async (file: File[]) => {
    //Ensure File Upload is of type .html
    if (file[0].type !== "text/html") {
      toast.error("Invalid File Type. Please upload a markdown file.", {
        position: "top-right",
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = Buffer.from(reader.result as ArrayBuffer);
      if (!content) return;

      //Upload Buffer to Database
      const response = await UploadProfileReadMe(content, user.id);
      if (response) {
        toast.success("ReadMe File Uploaded Successfully", {
          position: "top-right",
        });
        //Update Locally
        setFetchedProfile((prev) => {
          return { ...prev, readMe: content };
        });
      }
    };
    reader.readAsArrayBuffer(file[0]);
  };

  const newReadme = () => {
    //Create a new ReadMe File
    const content = Buffer.from(readMeTemplate);
    UploadProfileReadMe(content, user.id).then((response) => {
      if (response) {
        toast.success("ReadMe File Created Successfully", {
          position: "top-right",
        });
        //Update Locally
        setFetchedProfile((prev) => {
          return { ...prev, readMe: content };
        });
      }
    });
  };

  if (!readMe) {
    if (isOwnProfile) {
      return (
        <section className="flex flex-col items-center py-12 px-8">
          <h2 className="text-2xl font-bold">
            No ReadMe File Found for this Account
          </h2>
          <h3 className="text-secondary-header mt-2 max-w-md">
            Drag an existing html file in or click the Plus button to create a
            brand new one!
          </h3>
          <div className="w-full h-full relative">
            <FileUploader
              className="my-8 h-[30rem]"
              onFileUpload={uploadReadMe}
            />

            <Button
              onClick={newReadme}
              className="absolute -right-6 top-2 rounded-full h-14 w-14 px-0 hover:bg-transparent"
              variant={"ghost"}
            >
              <PlusCircleIcon className="w-14 h-14 stroke-secondary-header rounded-full backdrop-blur-lg hover:stroke-primary transition-colors" />
            </Button>
          </div>
        </section>
      );
    }
    return <div>This User has not created a Readme Document Yet</div>;
  }

  return (
    <div className="relative mx-8 my-12">
      <MarkdownPrevew
        source={Buffer.from(readMe).toString("utf-8")}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        style={{ backgroundColor: "transparent", color: "var(--foreground)" }}
      />

      <MarkdownEditor content={readMe}>
        {isOwnProfile && (
          <Button variant={"ghost"} className="px-2 absolute top-0 right-0">
            <PencilSquareIcon className="w-8 h-8" />
          </Button>
        )}
      </MarkdownEditor>
    </div>
  );
};

export default ReadMe;
