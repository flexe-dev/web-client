import { ModalProps } from "@/lib/interface";
import { z } from "zod";
import { useDocumentCreator } from "../context/DocumentCreatorProvider";
import { usePostAuxData } from "../context/PostCreatorAuxProvider";
import { Dialog, DialogContent } from "../ui/dialog";

interface Props extends ModalProps {
  onSubmit: () => void;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  tags: z.array(
    z.string().min(2, { message: "Tag must be at least 2 characters." })
  ),
  tech: z.array(
    z.string().min(2, { message: "Tech Stack must be at least 2 characters." })
  ),
});

const PostSubmit = ({ open, callback, onSubmit }: Props) => {
  const { document } = useDocumentCreator();
  const {
    tags: postTags,
    setTags,
    title,
    setTitle,
    tech: postTech,
    setTech,
  } = usePostAuxData();

  return (
    <Dialog modal={true} open={open} onOpenChange={callback}>
      <DialogContent></DialogContent>
    </Dialog>
  );
};

export default PostSubmit;
