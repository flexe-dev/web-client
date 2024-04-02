import React from "react";
import Head from "next/head";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="flex h-screen">
      <aside className="h-full border-r w-[30rem]">
        
      </aside>
      <section>{children}</section>
    </main>
  );
};

export default Layout;
