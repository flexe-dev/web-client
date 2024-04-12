"use client";

import ReadMe from "@/components/profile/readme/ReadMe";
import Portfolio from "@/components/profile/Portfolio";
import { Button } from "@/components/ui/button";
import { Activity } from "@/components/profile/Activity";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
interface Feed {
  id: number;
  title: string;
  content: string;
}

const profileTabs = ["portfolio", "activity", "readme"] as const;
type Tabs = (typeof profileTabs)[number];

const ProfileContent: React.FC = () => {
  const params = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tabs>(
    (params.get("tab") as Tabs) || "readme"
  );

  const renderedComponent: Record<Tabs, React.ReactNode> = {
    portfolio: <Portfolio />,
    activity: <Activity />,
    readme: <ReadMe />,
  };

  return (
    <div className="flex-auto relative">
      <div className="flex flex-row items-center justify-center w-full sticky top-[5rem] bg-background">
        {profileTabs.map((tab) => (
          <Button
            variant={"link"}
            className={`w-1/3 py-2 rounded-none hover:no-underline ${
              activeTab === tab
                ? "border-b-4 border-secondary-foreground text-secondary-foreground"
                : "border-b-4 border-muted text-secondary-header"
            } `}
            onClick={() => {
              setActiveTab(tab);
              scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {tab}
          </Button>
        ))}
      </div>
      {renderedComponent[activeTab]}
    </div>
  );
};

export default ProfileContent;
