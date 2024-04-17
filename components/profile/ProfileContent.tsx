"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { userProfileViewer } from "../context/UserProfileProvider";
import { useParams } from "next/navigation";
import ErrorPage from "../Error";
export const profileTabs = [
  "readme",
  "portfolio",
  "posts",
  "activity",
] as const;
export type Tabs = (typeof profileTabs)[number];

interface ContentProps {
  children: React.ReactNode;
}

const ProfileContent: React.FC<ContentProps> = ({ children }) => {
  const { fetchedUser } = userProfileViewer();
  const params = useParams<{ username: string; tag: string }>();
  const [activeTab, setActiveTab] = useState<Tabs>(
    (params.tag as Tabs) || "readme"
  );

  const tabLink: Record<Tabs, string> = {
    portfolio: `/${fetchedUser?.username}/portfolio`,
    activity: `/${fetchedUser?.username}/activity`,
    posts: `/${fetchedUser?.username}/posts`,
    readme: `/${fetchedUser?.username}/`,
  };

  useEffect(() => {
    setActiveTab((params.tag as Tabs) || "readme");
  }, [params]);

  if (params.tag && !profileTabs.includes(params.tag as Tabs))
    return <ErrorPage />;

  return (
    <div className="flex-auto relative">
      <div className="flex flex-row z-[40] h-fit items-center justify-center w-full sticky top-[5rem] bg-background">
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
