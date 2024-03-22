import { Navbar } from "@/components/navbar";
import FeaturedSnippets from "@/components/ui//Landing/FeaturedSnippets";
import { Footer } from "@/components/ui/Footer";
import { BackgroundGrid } from "@/components/ui/GridBackground";
import { CreationParallaxWrapper } from "@/components/ui/Landing/CreatorShowcase";
import NewsletterPrompt from "@/components/ui/Landing/NewsletterPrompt";
export default function Home() {
  return (
    <>
      <Navbar />
      <BackgroundGrid />
      <CreationParallaxWrapper>
        <div className=" px-12 lg:px-24 max-w-screen-lg h-full flex flex-col justify-center  z-[30]">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-200 ">
            Developing projects <br /> doesn't need to be difficult
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl md:ml-2 mt-6 md:mt-12 max-w-screen-sm text-secondary-header">
            Find design and code inspiration easy and fast through our gallery
            of curated projects and portfolios. Sourced from some of the
            brighest developers and designers from around the world.
          </h2>
        </div>
      </CreationParallaxWrapper>
      <FeaturedSnippets />
      <NewsletterPrompt />
      <Footer />
    </>
  );
}
