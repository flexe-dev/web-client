"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Link from "next/link";
import { userProfileViewer } from "../context/UserProfileProvider";

const profileTabs = ["portfolio", "activity", "readme"] as const;
type Tabs = (typeof profileTabs)[number];

interface ContentProps {
  children: React.ReactNode;
}

const ProfileContent: React.FC<ContentProps> = ({ children }) => {
  const { fetchedUser, fetchedProfile } = userProfileViewer();
  const [activeTab, setActiveTab] = useState<Tabs>("readme");
  const tabLink: Record<Tabs, string> = {
    portfolio: `/${fetchedUser?.username}/portfolio`,
    activity: `/${fetchedUser?.username}/activity`,
    readme: `/${fetchedUser?.username}/`,
  };

  return (
    <div className="flex-auto relative">
      <div className="flex flex-row h-fit items-center justify-center w-full sticky top-[5rem] bg-background">
        {profileTabs.map((tab) => (
          <Button
            asChild
            key={`profile-tab-${tab}`}
            variant={"link"}
            onClick={() => setActiveTab(tab)}
            className={`w-1/3 py-2 rounded-none border-b-4 hover:no-underline 
                  ${
                    activeTab === tab
                      ? "border-primary"
                      : "text-secondary-header"
                  }
                  `}
          >
            <Link href={tabLink[tab]}>{tab}</Link>
          </Button>
        ))}
      </div>
      {children}
    </div>
  );
};

export default ProfileContent;
