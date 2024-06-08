"use client";

import { Button } from "../ui/button";
import PostSubmit from "./PostSubmit";
import { useDocumentCreator } from "../context/DocumentCreatorProvider";
import { toast } from "sonner";
import { usePostAuxData } from "../context/PostCreatorAuxProvider";
import CancelWarn from "../CancelWarn";
import { useState } from "react";
import { savePostAsDraft } from "@/controllers/PostController";
import { useAccount } from "../context/AccountProvider";

export const CreatorHeader = () => {
  const { document, content } = useDocumentCreator();
  const { user } = useAccount();
  const { id, title, tags, tech, thumbnail, postStatus, setThumbnail } =
    usePostAuxData();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [savedDraft, setSavedDraft] = useState(false);

  const saveAsDraft = async () => {
    if (!user) return;
    if (!thumbnail) {
      setThumbnail(content[0]);
    }
    const post = {
      document,
      data: {
        id,
        title,
        tags,
        tech,
        thumbnail,
        postStatus,
      },
    };
    console.log(post);
    toast.promise(savePostAsDraft(post, user.id), {
      loading: "Saving Draft...",
      success: "Draft Saved",
      error: "Failed to Save Draft",
    });
  };

  const onCancel = () => {
    setShowCancelModal(true);
  };
  return (
    <>
      <section className="h-[4rem] w-full py-4 sticky z-[40] top-[5rem] flex">
        <div className="hidden md:block w-24 px-6">
          <Button onClick={onCancel} variant={"destructive"}>
            Cancel
          </Button>
        </div>
        <div className="flex flex-grow justify-end mr-16 space-x-4">
          <Button
            onClick={onCancel}
            className="block md:hidden"
            variant={"destructive"}
          >
            Cancel
          </Button>

          <Button
            onClick={saveAsDraft}
            className="backdrop-blur-md z-[99]"
            variant={"outline"}
          >
            Save as Draft
          </Button>
          <Button onClick={() => setShowPublishModal(true)}>Publish</Button>
        </div>
      </section>
      <PostSubmit />
      <CancelWarn
        path="/"
        modalVisible={showCancelModal}
        callback={setShowCancelModal}
      />
    </>
  );
};
