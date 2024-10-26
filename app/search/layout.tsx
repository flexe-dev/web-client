import { Footer } from "@/components/ui/Shared/Footer";
import { ReactNode } from "react";
type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
