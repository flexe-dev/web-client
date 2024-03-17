"use client";

import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";

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
    <section className=" w-screen  py-3 px-12 lg:p-24">
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
          }}
          className="w-full py-8 md:p-16"
        >
          <CarouselContent className="space-x-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-2/3">
                <div className="w-full aspect-[3/2] md:aspect-video  rounded-xl  transition-all bg-slate-400"></div>
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
                className={`rounded-full w-[1rem] aspect-square  ${
                  index === current - 1
                    ? "bg-inverted"
                    : "bg-secondary-header/50"
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

interface StyledLinkProps {
  children: React.ReactNode;
  href: string;
}
export const StyledWordLink = (props: StyledLinkProps) => {
  const { href, children } = props;
  return (
    <>
      {" "}
      <Link
        href={href}
        className="text-primary font-semibold animate-pulse group"
      >
        <i>{children}</i>
      </Link>{" "}
    </>
  );
};
