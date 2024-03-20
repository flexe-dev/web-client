import { Navbar } from "@/components/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen flex ">
      <Navbar />
      <section className="w-0 md:w-[35%] lg:w-[55%] transition-all h-full md:border-r-2 border-r-secondary-header flex-shrink"></section>
      <section className="flex flex-grow justify-center items-center">{children}</section>
    </main>
  );
}
