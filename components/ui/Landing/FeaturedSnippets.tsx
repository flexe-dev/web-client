"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Shared/carousel";
import { images } from "@/lib/placeholder";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StyledWordLink } from "../Shared/StyledWorkLink";

function FeaturedSnippets() {
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
    <section className=" w-screen px-12 lg:p-24 pb-8 lg:pb-6">
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-screen-xl">
        See some of our favourite design snippets from the week
      </h2>
      <h3 className="ml-2 mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl max-w-screen-sm text-secondary-header">
        Want to see your hard work featured? <br /> Submit your beautiful
        creations in our
        <StyledWordLink href={"/discussions"}>forumns</StyledWordLink>
        and get a change to be featured in our galleries
      </h3>
      <div className="w-full flex flex-col justify-center items-center">
        <Carousel
          setApi={setAPI}
          plugins={[
            Autoplay({
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full py-12 md:p-12 lg:p-16 lg:pb-6 "
        >
          <CarouselContent className="space-x-4 flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="md:basis-5/6 lg:basis-2/3 cursor-pointer"
              >
                <div className="w-full relative aspect-[3/2] md:aspect-video overflow-hidden rounded-xl transition-all">
                  <Link href={"/post/19381"}>
                    <Image
                      className="hover:scale-105 transition-all"
                      {...images[index % images.length]}
                      fill
                    />
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div id="carousel-progress" className="flex space-x-2">
          {api?.scrollSnapList().map((_, index) => {
            return (
              <div
                key={`progress-${index}`}
                className={`rounded-full w-[0.75rem] aspect-square  ${
                  index === current - 1
                    ? "bg-inverted/80"
                    : "bg-secondary-header/40"
                } transition-all`}
              ></div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturedSnippets;
