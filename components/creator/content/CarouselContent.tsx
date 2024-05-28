"use client";

import { ContentBlockProp, PostUserMedia } from "@/lib/interface";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ContentWrapper from "./ContentWrapper";
import { omit } from "lodash";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SortableItem } from "@/components/dnd/Sortable";
import Autoplay from "embla-carousel-autoplay";

const GalleryContent = (props: ContentBlockProp) => {
  const { value, style, id, options } = props;
  const [vertPos, horizPos] = [style?.alignItems, style?.justifyContent];
  const [api, setAPI] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => [setCurrent(api.selectedScrollSnap() + 1)]);
  }, [api]);

  return (
    <SortableItem id={id}>
      <ContentWrapper id={id} type="carousel">
        <Carousel className="w-full h-full relative" setApi={setAPI}>
          <CarouselContent className="p-1">
            {(value as PostUserMedia[]).map((image, index) => (
              <CarouselItem
                className="w-full h-full flex"
                style={{ justifyContent: horizPos, alignItems: vertPos }}
                key={index}
              >
                <div
                  style={omit(style, ["justifyContent", "alignItems"])}
                  className="basis-full w-fit flex relative aspect-[4/3]  overflow-hidden"
                >
                  <Image
                    width={image.content.width}
                    height={image.content.height}
                    src={image.content.location}
                    alt={image.file.name}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div
            id="carousel-progress"
            className="flex space-x-2 absolute bottom-4 w-full left-1/2 right-1/2"
          >
            {(value as PostUserMedia[]).map((_, index) => {
              return (
                <div
                  key={`progress-${index}`}
                  className={`rounded-full w-[1.25rem] aspect-square  ${
                    index === current - 1
                      ? "bg-inverted/80"
                      : "bg-secondary-header/40"
                  } transition-all`}
                ></div>
              );
            })}
          </div>
        </Carousel>
      </ContentWrapper>
    </SortableItem>
  );
};

export default GalleryContent;
