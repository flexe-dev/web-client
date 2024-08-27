"use client";

import { ProfileViewerPostProvider } from "@/components/context/ProfileViewPostProvider";
import { ProfileViewerUserProvider } from "@/components/context/ProfileViewUserProvider";
import ProfileContent from "@/components/profile/ProfileContent";
import { Footer } from "@/components/ui/Footer";
import { ChildNodeProps } from "@/lib/interface";
import React from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";

const Layout: React.FC<ChildNodeProps> = ({ children }) => {
  return (
    <>
      <main className="min-h-screen relative">
        <ProfileViewerUserProvider>
          <ProfileViewerPostProvider>
            <div className="relative w-full justify-center px-4 py-8 flex flex-col lg:flex-row gap-8">
              <ProfileHeader />
              <ProfileContent>{children}</ProfileContent>
            </div>
          </ProfileViewerPostProvider>
        </ProfileViewerUserProvider>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
