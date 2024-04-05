import React from "react";
import GallerySidebarWrapper from "@/components/ui/Gallery/GalleryWrapper";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <GallerySidebarWrapper>{children}</GallerySidebarWrapper>;
};

export default Layout;
