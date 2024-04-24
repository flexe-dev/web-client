import React from "react";
import GallerySidebarWrapper from "@/components/ui/Gallery/GalleryWrapper";
import { ChildNodeProps } from "@/lib/interface";
import { Footer } from "@/components/ui/Footer";

const Layout: React.FC<ChildNodeProps> = ({ children }) => {
  return (
    <>
      <GallerySidebarWrapper>{children}</GallerySidebarWrapper>
      <Footer />
    </>
  );
};

export default Layout;
