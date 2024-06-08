import { SortableItem } from "@/components/dnd/Sortable";
import { Skeleton } from "@/components/ui/skeleton";
import { ContentBlockProp, PostUserMedia } from "@/lib/interface";
import { cn, getVideoThumbnail } from "@/lib/utils";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { omit } from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import ContentWrapper from "./ContentWrapper";

export const VideoContent = (props: ContentBlockProp) => {
  const { value, style } = props;
  const [vertPos, horizPos] = [style?.alignItems, style?.justifyContent];
  return (
    <SortableItem id={props.id}>
      <ContentWrapper id={props.id} type="video">
        <div
          className="flex w-full p-4"
          style={{ justifyContent: horizPos, alignItems: vertPos }}
        >
          <div
            className="w-fit flex relative aspect-[4/3] overflow-hidden"
            style={omit(style, ["justifyContent", "alignItems"])}
          >
            {value ? <ContentVisual {...props} /> : <DefaultContent />}
          </div>
        </div>
      </ContentWrapper>
    </SortableItem>
  );
};

const DefaultContent = () => {
  //todo: give user ability to upload a picture or select from sidebar
  return (
    <div className="max-w-2xl flex justify-center items-center">
      <VideoCameraIcon className="w-36 h-36" />
      <h2>Add a Video Here</h2>
    </div>
  );
};

const ContentVisual = ({ value, options }: ContentBlockProp) => {
  const [videoThumbnail, setVideoThumbnail] = useState<string | undefined>();
  useEffect(() => {
    const generateStaticThumbnail = async () => {
      const thumbnail = await getVideoThumbnail(
        (value?.contentValue as PostUserMedia).content.location
      );
      setVideoThumbnail(thumbnail);
    };
    generateStaticThumbnail();
  }, []);

  return (
    <div className="group">
      <video
        width={(value?.contentValue as PostUserMedia).content.width}
        height={(value?.contentValue as PostUserMedia).content.height}
        src={(value?.contentValue as PostUserMedia).content.location}
        autoPlay
        loop
        controls
        className={cn(options?.playOnHover && "hidden group-hover:block")}
      />
      {options?.playOnHover && (
        <div className="group-hover:hidden">
          {videoThumbnail ? (
            <Image
              width={(value?.contentValue as PostUserMedia).content.width}
              height={(value?.contentValue as PostUserMedia).content.height}
              src={videoThumbnail}
              alt="Video Thumbnail"
            />
          ) : (
            <Skeleton className="absolute inset-0" />
          )}
        </div>
      )}
    </div>
  );
};
