import { Footer } from "../Shared/Footer";
import BackgroundGrid from "../Shared/GridBackground";
import FeaturedSnippets from "./FeaturedSnippets";
import NewsletterPrompt from "./NewsletterPrompt";

export const HomePageLanding = () => {
  return (
    <>
      <BackgroundGrid />
      <div className="h-[80dvh] px-12 lg:px-24 max-w-screen-lg flex flex-col mt-48 z-[30]">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-200 ">
          Standing out in the tech world has never been easier
        </h1>
        <h2 className="text-lg md:text-xl lg:text-2xl md:ml-2 mt-6 md:mt-12 max-w-screen-sm text-secondary-header">
          Build your digital portfolio and connect with our
          <span className="mx-2 text-primary animate-pulse font-bold">
            712801
          </span>
          other likeminded techies who are passionate about all things software,
          and explore content designed to help inspire, teach and connect to
          further assist your code.
        </h2>
      </div>
      <FeaturedSnippets />
      <NewsletterPrompt />
      <Footer />
    </>
  );
};
