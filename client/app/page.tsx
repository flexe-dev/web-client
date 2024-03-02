import { LandingNavbar } from "@/components/navbar";
import { BackgroundGrid } from "@/components/ui/GridBackground";
export default function Home() {
  return (
    <>
      <BackgroundGrid />
      <LandingNavbar />
      <main className="px-24 py-16 ">
        <h1>
          Where developers go to <br />
          <span className="ml-5">design better projects</span>
        </h1>
      </main>
    </>
  );
}
