import { ModalProps } from "@/lib/interface";
import { nullIfEmpty } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDocumentCreator } from "../context/DocumentCreatorProvider";
import { usePostAuxData } from "../context/PostCreatorAuxProvider";
import { InputChips } from "../ui/Gallery/InputChips";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";

interface Props extends ModalProps {
  onSubmit: () => void;
}

const PostSubmit = ({ open, callback, onSubmit }: Props) => {
  const { document } = useDocumentCreator();
  const [validationError, setValidationError] = useState<boolean>(false);
  const {
    tags: postTags,
    setTags,
    title,
    setTitle,
    tech: postTech,
    setTech,
  } = usePostAuxData();

  const handleSubmit = async () => {
    if (!nullIfEmpty(title.trim())) {
      setValidationError(true);
      return;
    }
    onSubmit();
  };

  return (
    <Dialog modal={true} open={open} onOpenChange={callback}>
      <DialogContent className="min-w-[40rem] h-auto ">
        <h1 className="text-xl font-semibold text-center">Publish Your Post</h1>
        <motion.div className="w-full flex flex-col space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Post Title</h2>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <InputChips
            content={postTags}
            setContent={setTags}
            title="Post Tags"
            sectionID="input-tags"
          />
          <InputChips
            content={postTech}
            setContent={setTech}
            title="Tech Stack"
            sectionID="input-tech"
          />
        </motion.div>
        <motion.div className="flex justify-center">
          <Button className="w-1/3 font-semibold" onClick={handleSubmit}>
            Submit
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default PostSubmit;
