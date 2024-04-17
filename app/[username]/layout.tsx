"use client";

import React from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileContent from "@/components/profile/ProfileContent";
import { ProviderViewerProvider } from "@/components/context/UserProfileProvider";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen">
      <ProviderViewerProvider>
        <div className="mx-[8rem] px-4 py-8 flex flex-col lg:flex-row gap-8 relative">
          <ProfileHeader />
          <ProfileContent>{children}</ProfileContent>
        </div>
      </ProviderViewerProvider>
    </main>
  );
};

export default Layout;
