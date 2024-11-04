import { PostInteractionProvider } from "@/components/context/User/PostInteractionContext";
import {
  ModalToolCallback,
  PostToolsProvider,
} from "@/components/context/User/PostOptionToolProvider";
import { Button } from "@/components/ui/Shared/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/Shared/dialog";
import {
  ChildNodeProps,
  MediaPost,
  ModalInteractionProps,
  Post,
} from "@/lib/interface";
import { EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FC } from "react";
import DisplayPost from "./DisplayPost";
import { PostPreviewDisplayMetrics } from "./PostPreviewDisplayMetrics";

interface Props extends ChildNodeProps {
  post: MediaPost;
  onPostUpdate: (post: Post) => void;
  interaction: ModalInteractionProps;
  triggerChild?: boolean;
  modalCloseCallback?: () => void;
}

const PostDisplayModal: FC<Props> = ({
  modalCloseCallback,
  post,
  onPostUpdate,
  triggerChild,
  children,
  interaction: { open, setOpen },
}) => {
  if (!post?.id) return null;

  const handleModalVisibility = (visibility: boolean) => {
    if (modalCloseCallback) modalCloseCallback();
    setOpen(visibility);
  };

  const toolCallbacks: ModalToolCallback = {
    delete: () => handleModalVisibility(false),
    archive: () => handleModalVisibility(false),
  };

  return (
    <PostInteractionProvider
      callback={onPostUpdate}
      post={post}
      key={`post-media-${post.id}`}
    >
      <Dialog open={open} onOpenChange={handleModalVisibility}>
        {triggerChild ? (
          <DialogTrigger asChild>{children}</DialogTrigger>
        ) : (
          <>{children}</>
        )}

        <DialogContent className="px-4 py-1 min-w-[90%] max-w-[90%] lg:min-w-[80%] lg:max-w-[80%] xl:max-w-[70%] h-[80dvh] flex flex-col overscroll-none">
          <PostPreviewDisplayMetrics />
          <div className="w-full flex relative justify-center items-center z-[80] min-h-[3rem] max-h-[3rem] bg-background border-b-2">
            <PostToolsProvider
              key={`post-modal-tool-${post.id}`}
              callbacks={toolCallbacks}
              post={post}
            >
              <Button
                size={"icon"}
                variant={"ghost"}
                className="absolute left-2 h-8"
              >
                <EllipsisHorizontalIcon className="w-6 h-6" />
              </Button>
            </PostToolsProvider>
            <Link href={`/post/media/${post.id}`}>
              <h2 className="w-96 truncate text-lg font-bold hover:underline">
                {post.document.title}{" "}
              </h2>
            </Link>
            <Button
              size={"icon"}
              className="h-8 absolute right-2"
              onClick={() => handleModalVisibility(false)}
              variant={"ghost"}
            >
              <XMarkIcon className="h-6" />
            </Button>
          </div>

          <div className="flex flex-col overflow-x-hidden overflow-y-auto -mt-4 relative">
            <DisplayPost className="px-4 md:px-16" post={post} />
          </div>
        </DialogContent>
      </Dialog>
    </PostInteractionProvider>
  );
};

export default PostDisplayModal;
