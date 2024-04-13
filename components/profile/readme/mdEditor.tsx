import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-markdown-editor";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useTheme } from "next-themes";
import { UploadProfileReadMe } from "@/controllers/ProfileController";
import { useAccount } from "@/components/context/AccountProvider";
import { toast } from "sonner";
import DOMPurify from "dompurify";

interface EditorProps {
  children: React.ReactNode;
  content: Buffer;
}
const MarkdownEditor = (props: EditorProps) => {
  const { children, content } = props;
  const { theme } = useTheme();
  const { user, profile, setProfile } = useAccount();

  const [readMeValue, setReadMeValue] = useState<string>(
    Buffer.from(content).toString("utf-8")
  );

  if (!user || !profile) return null;

  const handleUpdate = () => {
    //Update ReadMe File
    if (!readMeValue) return;
    const updatedContent = Buffer.from(readMeValue);
    UploadProfileReadMe(updatedContent, user.id).then((response) => {
      if (response) {
        setProfile({ ...profile, readMe: updatedContent });
        toast.success("ReadMe File Updated Successfully", {
          position: "top-right",
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="w-full min-w-[80dvw] min-h-[80dvh] flex flex-col justify-center">
        <MDEditor
          value={readMeValue}
          data-color-mode={theme === "dark" ? "dark" : "light"}
          enablePreview={true}
          previewWidth="50%"
          className="min-w-[75dvw] min-h-[75dvh]"
          onChange={(value) => {
            if (value) {
              setReadMeValue(value);
            }
          }}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdate}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MarkdownEditor;
