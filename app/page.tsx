import { Navbar } from "@/components/navbar";
import FeaturedSnippets from "@/components/ui//Landing/FeaturedSnippets";
import { Footer } from "@/components/ui/Footer";
import { BackgroundGrid } from "@/components/ui/GridBackground";
import { CreationParallaxWrapper } from "@/components/ui/Landing/CreatorShowcase";
import NewsletterPrompt from "@/components/ui/Landing/NewsletterPrompt";
export default function Home() {
  return (
    <>
      <BackgroundGrid />
      <div className="h-[80dvh] px-12 lg:px-24 max-w-screen-lg flex flex-col mt-48 z-[30]">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-200 ">
          Being a Developer doesn't need to be so difficult all the time
        </h1>
        <h2 className="text-lg md:text-xl lg:text-2xl md:ml-2 mt-6 md:mt-12 max-w-screen-sm text-secondary-header">
          Join a community of
          <span className="mx-2 text-primary animate-pulse font-bold">
            712801
          </span>
          other likeminded techies who are passionate about all things software
          and explore content designed to help inspire, teach and connect to
          further assist your code.
        </h2>
      </div>
      <FeaturedSnippets />
      <NewsletterPrompt />
    </>
  );
}
