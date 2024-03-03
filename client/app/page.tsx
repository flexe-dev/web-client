import { LandingNavbar } from "@/components/navbar";
import { BackgroundGrid } from "@/components/ui/GridBackground";
export default function Home() {
  return (
    <>
      <BackgroundGrid />
      <LandingNavbar />
      <main className="overflow-x-hidden">
        <section className="h-screen flex px-8 md:px-16 lg:px-24 py-24  items-center">
          <div className="max-w-screen-lg">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-200 ">
              Developing projects <br /> doesn't need to be difficult
            </h1>
            <h2 className="text-lg lg:text-2xl md:ml-2 mt-6 md:mt-12 max-w-screen-md text-neutral-600 dark:text-neutral-400">
              Find inspiration from a curated gallery of developer portfolio and
              projects sourced from developers from tech companies across the
              globe.
            </h2>
          </div>
        </section>
      </main>
    </>
  );
}
