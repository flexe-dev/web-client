import { Footer } from "@/components/ui/Shared/Footer";
import { ChildNodeProps } from "@/lib/interface";

const Layout = ({ children }: Readonly<ChildNodeProps>) => {
  return (
    <>
      <div>{children}</div>;
      <Footer />
    </>
  );
};

export default Layout;
