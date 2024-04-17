import React from "react";
import GallerySidebarWrapper from "@/components/ui/Gallery/GalleryWrapper";
import { ChildNodeProps } from "@/lib/interface";

const Layout: React.FC<ChildNodeProps> = ({ children }) => {
  return <GallerySidebarWrapper>{children}</GallerySidebarWrapper>;
};

export default Layout;
