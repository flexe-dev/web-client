import React from "react";
import Head from "next/head";
import GallerySidebar from "@/components/ui/GallerySidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="flex h-screen">
      <GallerySidebar />
      <section className="flex flex-grow px-24 py-8">{children}</section>
    </main>
  );
};

export default Layout;
