import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useTheme } from "next-themes";
import { UploadProfileReadMe } from "@/controllers/UserController";
import { useAccount } from "@/components/context/AccountProvider";
import { toast } from "sonner";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { ChildNodeProps } from "@/lib/interface";
interface EditorProps extends ChildNodeProps {
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
      <AlertDialogContent className="w-full min-w-[80dvw] min-h-[80dvh] max-h-[90dvh] flex flex-col justify-center">
        <MDEditor
          value={readMeValue}
          data-color-mode={theme === "dark" ? "dark" : "light"}
          className="min-w-[75dvw] min-h-[75dvh]"
          previewOptions={{
            rehypePlugins: [[rehypeSanitize, rehypeRaw]],
            remarkPlugins: [remarkGfm],
          }}
          onChange={(value) => {
            if (value) {
              setReadMeValue(value);
            }
          }}
        >
          <MDEditor.Markdown
            source={readMeValue}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </MDEditor>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdate}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MarkdownEditor;
