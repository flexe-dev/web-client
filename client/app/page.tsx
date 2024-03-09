import { Navbar } from "@/components/navbar";
import { BackgroundGrid } from "@/components/ui/GridBackground";
import { CreationParallaxWrapper } from "@/components/ui/UserProjectHome/CreatorShowcase";
import { Button } from "@/components/ui/button";
export default function Home() {
  const creations = [
    { title: "a" },
    { title: "b" },
    { title: "c" },
    { title: "d" },
    { title: "e" },
    { title: "f" },
  ];
  return (
    <>
      <Navbar />

      <BackgroundGrid />

      <CreationParallaxWrapper creations={creations}>
        <div className="max-w-screen-lg h-full flex flex-col justify-center  z-[30]">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-200 ">
            Developing projects <br /> doesn't need to be difficult
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl md:ml-2 mt-6 md:mt-12 max-w-screen-sm text-neutral-600 dark:text-neutral-400">
            Find design inspiration easy and fast through our gallery of curated
            projects and portfolios sourced from developers and designers from
            some of the biggest tech companies across the globe.
          </h2>
        </div>
      </CreationParallaxWrapper>
      <section className="h-screen"></section>
    </>
  );
}
