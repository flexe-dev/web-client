import { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/ui/Footer";
type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default Layout;
