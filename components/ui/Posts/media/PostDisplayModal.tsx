import { useAccountPost } from "@/components/context/AccountPostProvider";
import { PostInteractionProvider } from "@/components/context/PostInteractionContext";
import { PostToolsProvider } from "@/components/context/PostOptionToolProvider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MediaPost } from "@/lib/interface";
import { EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect } from "react";
import DisplayPost from "./DisplayPost";
import { PostPreviewDisplayMetrics } from "./PostPreviewDisplayMetrics";

interface Props {
  callback: () => void;
  selectedPost?: MediaPost;
}

const PostDisplayModal = (props: Props) => {
  const { selectedPost, callback } = props;
  const { userPosts } = useAccountPost();

  useEffect(() => {
    if (
      !userPosts?.mediaPosts.map((post) => post.id).includes(selectedPost?.id)
    ) {
      callback();
    }
  }, [userPosts]);

  if (!selectedPost || !selectedPost.id) return null;
  return (
    <PostInteractionProvider
      postId={selectedPost.id}
      postMetrics={selectedPost.metrics}
      postType="MEDIA"
    >
      <Dialog open={!!selectedPost} onOpenChange={callback}>
        <DialogContent className="px-4 py-1 min-w-[90%] max-w-[90%] lg:min-w-[80%] lg:max-w-[80%] xl:max-w-[70%] h-[80dvh] flex flex-col overscroll-none">
          <PostPreviewDisplayMetrics />
          <div className="w-full flex justify-center items-center z-[80] min-h-[3rem] max-h-[3rem] bg-background border-b-2">
            <PostToolsProvider postId={selectedPost.id} postType="MEDIA">
              <Button
                size={"icon"}
                variant={"ghost"}
                className="absolute left-2 h-8"
              >
                <EllipsisHorizontalIcon className="w-6 h-6" />
              </Button>
            </PostToolsProvider>
            <Link href={`/post/media/${selectedPost.id}`}>
              <h2 className="w-[15rem] truncate text-xl font-bold hover:underline">
                {selectedPost.auxData.title}{" "}
              </h2>
            </Link>

            <Button
              size={"icon"}
              className="h-8 absolute right-2"
              onClick={callback}
              variant={"ghost"}
            >
              <XMarkIcon className="h-6" />
            </Button>
          </div>

          <div className="flex flex-col overflow-x-hidden overflow-y-auto -mt-4 relative">
            <DisplayPost post={selectedPost} />
          </div>
        </DialogContent>
      </Dialog>
    </PostInteractionProvider>
  );
};

export default PostDisplayModal;
