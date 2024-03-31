import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>{/* Add your header content here */}</header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
