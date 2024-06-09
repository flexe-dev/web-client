"use client";

import { savePostAsDraft } from "@/controllers/PostController";
import { UserPost } from "@/lib/interface";
import { useState } from "react";
import { toast } from "sonner";
import CancelWarn from "../CancelWarn";
import { useAccount } from "../context/AccountProvider";
import { useDocumentCreator } from "../context/DocumentCreatorProvider";
import { usePostAuxData } from "../context/PostCreatorAuxProvider";
import { Button } from "../ui/button";
import PostSubmit from "./PostSubmit";

export const CreatorHeader = () => {
  const { document, setDocument } = useDocumentCreator();
  const { user } = useAccount();
  const { thumbnail, id, title, tags, tech, postStatus } = usePostAuxData();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [savedDraft, setSavedDraft] = useState(false);

  const saveAsDraft = async () => {
    if (!user) return;
    const post: Omit<UserPost, "externalData"> = {
      id,
      document,
      auxData: {
        userID: user.id,
        title,
        tags,
        tech,
        thumbnail,
        postStatus: "DRAFT",
      },
    };

    toast.promise(
      savePostAsDraft(post).then((post) => {
        if (!post) return;
        setDocument(post.document);
      }),
      {
        loading: "Saving Draft...",
        success: "Draft Saved",
        error: "Failed to Save Draft",
      }
    );
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
