import GallerySidebarWrapper from "@/components/ui/Gallery/GalleryWrapper";
import { Footer } from "@/components/ui/Shared/Footer";
import { ChildNodeProps } from "@/lib/interfaces/componentTypes";
import React from "react";

const Layout: React.FC<ChildNodeProps> = ({ children }) => {
  return (
    <>
      <GallerySidebarWrapper>{children}</GallerySidebarWrapper>
      <Footer />
    </>
  );
};

export default Layout;
