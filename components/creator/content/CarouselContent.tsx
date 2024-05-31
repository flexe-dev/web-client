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
import { Button } from "@/components/ui/button";
import { usePostCreator } from "@/components/context/PostCreatorProvider";

const GalleryContent = (props: ContentBlockProp) => {
  const { value, style, id, options } = props;
  const [vertPos, horizPos] = [style?.alignItems, style?.justifyContent];
  const [api, setAPI] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { onValueChange } = usePostCreator();

  const generateCarouselPlugins = () => {
    const plugins = [];
    if (options?.carouselAutoplay) {
      plugins.push(
        Autoplay({
          delay: options?.carouselDuration,
          startOnInteraction: options?.carouselAutoplay,
        })
      );
    }
    return plugins;
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => [setCurrent(api.selectedScrollSnap() + 1)]);
  }, [api]);

  const removeFromCarousel = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.stopPropagation();
    onValueChange(
      id,
      (value as PostUserMedia[]).filter((_, i) => i !== index)
    );
    if ((value as PostUserMedia[]).length === 1) {
      ConvertToImageBlock();
    }
  };

  const ConvertToImageBlock = () => {};

  return (
    <SortableItem id={id}>
      <ContentWrapper id={id} className="overflow-hidden" type="carousel">
        <Carousel
          opts={{
            loop: options?.carouselLoop,
          }}
          plugins={generateCarouselPlugins()}
          className="m-4 w-full h-full relative"
          setApi={setAPI}
        >
          <CarouselContent className="">
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
                  <Button
                    onClick={(e) => removeFromCarousel(e, index)}
                    variant={"outline"}
                    className="border-destructive text-xs w-fit p-1 absolute top-4 right-4 bg-destructive/30 hover:bg-destructive/60 text-destructive"
                  >
                    Remove
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div
            className="w-full flex"
            style={{ justifyContent: horizPos, alignItems: vertPos }}
          >
            <div
              id="carousel-progress"
              style={{ width: style?.maxWidth }}
              className="flex space-x-2 0 w-full h-4 bg-background justify-center mt-4"
            >
              {(value as PostUserMedia[]).map((_, index) => {
                return (
                  <div
                    key={`progress-${index}`}
                    className={`rounded-full w-4 aspect-square  ${
                      index === current - 1
                        ? "bg-primary"
                        : "bg-secondary-header/40 backdrop-blur-md"
                    } transition-all`}
                  ></div>
                );
              })}
            </div>
          </div>
        </Carousel>
      </ContentWrapper>
    </SortableItem>
  );
};

export default GalleryContent;
