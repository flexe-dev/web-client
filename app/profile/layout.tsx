import React from "react";
import { Navbar } from "@/components/navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <main>{children}</main>;
};

export default Layout;
