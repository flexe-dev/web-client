"use client";

/* 
todo: 
  - Convert Carousel Back to Image Block if only one image is left
  - Improve Visuals from when moving carousel
  - Add Ability To Rearrange Order of Content in Carousel
  - Fix Resizing Issue from Image to Carousel On Mac 
*/

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
} from "@/components/ui/carousel";
import { SortableItem } from "@/components/dnd/Sortable";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { usePostCreator } from "@/components/context/PostCreatorProvider";
import { ImageCarouselVisualEffect } from "./ImageCarouselVisualWrapper";

const GalleryContent = (props: ContentBlockProp) => {
  const { value, style, id, options } = props;
  const [vertPos, horizPos] = [style?.alignItems, style?.justifyContent];
  const [api, setAPI] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [startIndex, setStartIndex] = useState<boolean>(false);
  const { onValueChange, onOptionsChange } = usePostCreator();

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

    if (!startIndex) {
      api.scrollTo(options?.activeIndex ?? 0, true);
      setStartIndex(true);
    }

    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      onOptionsChange(id, "activeIndex", api.selectedScrollSnap());
    });
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
          <ImageCarouselVisualEffect id={id}>
            <CarouselContent>
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
                      variant={"destructive"}
                      className="border-destructive text-xs w-fit p-1 h-fit absolute top-4 right-4"
                    >
                      Remove
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </ImageCarouselVisualEffect>
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
