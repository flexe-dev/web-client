import { NetworkSidebar } from "@/components/ui/Network/UserNetworkSidebar";
import { ChildNodeProps } from "@/lib/interface";
import React from "react";

const layout: React.FC<ChildNodeProps> = ({ children }) => {
  return (
    <div className="flex-col md:flex-row flex relative">
      <NetworkSidebar />
      <main className="flex flex-grow w-auto">{children}</main>
    </div>
  );
};

export default layout;
