import { usePostCreator } from "@/components/context/PostCreatorProvider";
import { DragHandle } from "@/components/dnd/Sortable";
import { ChildNodeProps, ClassNameProp, ContentType } from "@/lib/interface";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";

interface Props extends ChildNodeProps, ClassNameProp {
  noDrag?: true;
  id: string;
  type: ContentType;
}

const ContentWrapper = ({ children, className, noDrag, id, type }: Props) => {
  const {
    document,
    previewMode,
    onDelete,
    showDeletionConfirmation,
    setShowDeletionConfirmation,
    activeStylingTool,
    setActiveStylingTool,
    setPreviewMode,
  } = usePostCreator();
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (document.length === 1) {
      toast.error("You can't delete the last block.", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    if (showDeletionConfirmation) {
      setShowDeleteModal(true);
    } else {
      onDelete(id);
    }
  };
  return (
    <>
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setPreviewMode(false);
          setActiveStylingTool({ id: id, type: type });
        }}
        className={cn(
          "border-2 bg-background/80 w-full rounded-md flex",
          className,
          previewMode && "border-transparent resize-none",
          activeStylingTool?.id === id && "border-primary"
        )}
      >
        {children}
        {!previewMode && (
          <>
            <div className="flex absolute right-3 top-1/2 -translate-y-[50%]">
              {!noDrag && <DragHandle />}
            </div>
            <Button
              onClick={(e) => handleDelete(e)}
              variant={"destructive"}
              size={"sm"}
              className="h-5 p-1 w-5 rounded-full absolute -top-2 -right-2"
            >
              <XMarkIcon className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            Are you sure you want to delete this block
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-8 flex items-center justify-between relative">
            <div className="absolute left-3 flex flex-col items-center">
              <Switch
                checked={showDeletionConfirmation}
                onCheckedChange={setShowDeletionConfirmation}
              />
              <span className="text-xs mt-2">Show this warning</span>
            </div>
            <Button
              variant={"outline"}
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onDelete(id);
                setShowDeleteModal(false);
              }}
              variant="destructive"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ContentWrapper;
