import { PostToolsProvider } from "@/components/context/User/PostTools/PostOptionToolProvider";

import { useUserFeed } from "@/components/context/User/UserFeedProvider/UserFeedProvider";
import { ChildNodeProps, ClassNameProp } from "@/lib/interfaces/componentTypes";
import { ContentBlockType } from "@/lib/interfaces/documentTypes";
import { FeedPost } from "@/lib/interfaces/feedTypes";
import { MediaPost } from "@/lib/interfaces/postTypes";
import { cn } from "@/lib/util/utils";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { ExpandIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import PostDisplayModal from "../../Posts/Media/PostDisplayModal";
import { PostPreviewUserDetails } from "../../Posts/Shared/PostUserDetails";
import { TextPostMetricsDisplay } from "../../Posts/Text/TextPostMetricsDisplay";
import { Button } from "../../Shared/button";
import { Card, CardContent, CardFooter, CardHeader } from "../../Shared/card";
import { Chip } from "../../Shared/chip";

interface Props {
  feedPost: FeedPost;
}

export const FeedMediaPostDisplay: FC<Props> = ({ feedPost }) => {
  const post = feedPost.post as MediaPost;
  const { creator, users } = feedPost.users;
  const [displayPostModal, setDisplayPostMode] = useState<boolean>(false);
  const { onPostUpdate } = useUserFeed();

  const previewPost = () => {
    setDisplayPostMode(true);
    window.history.pushState(null, "", `/post/media/${post.id}`);
  };

  const closePostModal = () => {
    window.history.pushState(null, "", `/`);
  };

  const getPostMediaCount = () => {
    const mediaValues: ContentBlockType[] = ["IMAGE", "VIDEO", "CAROUSEL"];

    return post.document.document.filter(
      (block) => block.type && mediaValues.includes(block.type)
    ).length;
  };

  if (!post.id || !creator) return null;

  return (
    <PostDisplayModal
      onPostUpdate={onPostUpdate}
      key={`feed-post-display-${post.id}`}
      post={post}
      interaction={{ open: displayPostModal, setOpen: setDisplayPostMode }}
      modalCloseCallback={closePostModal}
    >
      <Card className="relative overflow-hidden flex-grow my-4">
        <CardHeader className="pb-2">
          <PostPreviewUserDetails post={post} user={creator} />
        </CardHeader>

        <CardContent className="mt-4 mb-2">
          <h2
            onClick={previewPost}
            className="text-lg font-bold pointer-events-auto cursor-pointer hover:underline transition-all"
          >
            {post.document.title}
          </h2>
          <main
            onClick={previewPost}
            className="relative cursor-pointer flex pointer-events-auto h-[25rem] lg:h-[30rem] xl:h-[35rem] my-4 group/post overflow-hidden shadow-md shadow-neutral-500 dark:shadow-none dark:border rounded-md hover/post:brightness-50 transition-all"
          >
            <section className="w-full h-full relative ">
              <Image
                src={
                  post.document.thumbnail ??
                  process.env.NEXT_PUBLIC_FALLBACK_PHOTO
                }
                fill
                alt={`Post ${post.document.title} Thumbnail Image`}
                objectFit="cover"
              ></Image>
            </section>
            <ImageCoverText
              position="bottomRight"
              className="group-hover/post:opacity-10 transition-all"
            >
              <ExpandIcon className="w-5 h-5" />
              <span className="ml-2 font-semibold">Click to Expand</span>
            </ImageCoverText>

            <ImageCoverText
              position="topLeft"
              className="px-3 py-1 group-hover/post:opacity-10 transition-all"
            >
              <ImageIcon className="w-5 h-5" />
              <span className="ml-2 font-semibold text-lg">
                {getPostMediaCount()}
              </span>
            </ImageCoverText>
          </main>
          <section className="flex mt-1 flex-wrap">
            {post.auxData.tags.slice(0, 10).map((tag) => (
              <Chip
                key={tag}
                content={tag}
                className="mx-0 px-3 cursor-pointer hover:bg-secondary/30 mr-2"
                sectionID={post.id!}
                readonly={true}
                size={"sm"}
                variant="outline"
              >
                <Link href={`/search/tags/${tag}`}>{tag}</Link>
              </Chip>
            ))}

            {post.auxData.tags.length > 10 && (
              <Link href={`/post/media/${post.id}`}>
                <Button variant={"secondary"} className="px-2 border h-6 m-1">
                  See All Tags
                </Button>
              </Link>
            )}
          </section>
        </CardContent>
        <CardFooter className="p-0 overflow-hidden">
          <TextPostMetricsDisplay />
        </CardFooter>
        <PostToolsProvider key={`post-tools-feed-${post.id}`} post={post}>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={(e) => e.stopPropagation()}
            className="hover:border-primary absolute right-4 top-4  hover:border-2 h-7"
          >
            <EllipsisHorizontalIcon className="w-6 h-6" />
          </Button>
        </PostToolsProvider>
      </Card>
    </PostDisplayModal>
  );
};

type Postion = "bottomLeft" | "bottomRight" | "topLeft" | "topRight";

interface CoverProps extends ChildNodeProps, ClassNameProp {
  position: Postion;
}

const ImageCoverText: FC<CoverProps> = ({ children, position, className }) => {
  const PositionStyleMap: Record<Postion, string> = {
    bottomLeft: "bottom-0 left-0 rounded-tr-md",
    bottomRight: "bottom-0 right-0 rounded-tl-md",
    topLeft: "top-0 left-0 rounded-br-md",
    topRight: "top-0 right-0 rounded-bl-md",
  };

  return (
    <div
      className={cn(
        "flex absolute items-center p-2 bg-neutral-800/40 text-neutral-50",
        PositionStyleMap[position],
        className
      )}
    >
      {children}
    </div>
  );
};
