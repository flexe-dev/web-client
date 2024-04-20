"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { userProfileViewer } from "../context/UserProfileProvider";
import { useParams } from "next/navigation";
import ErrorPage from "../Error";
import { ChildNodeProps } from "@/lib/interface";
export const profileTabs = [
  "readme",
  "portfolio",
  "posts",
  "activity",
] as const;
export type Tabs = (typeof profileTabs)[number];

const ProfileContent: React.FC<ChildNodeProps> = ({ children }) => {
  const { fetchedUser } = userProfileViewer();
  const params = useParams<{ username: string; tag: string }>();
  const [activeTab, setActiveTab] = useState<Tabs>(
    (params.tag as Tabs) || "readme"
  );

  const tabLink: Record<Tabs, string> = {
    portfolio: `/${fetchedUser.user?.username}/portfolio`,
    activity: `/${fetchedUser.user?.username}/activity`,
    posts: `/${fetchedUser.user?.username}/posts`,
    readme: `/${fetchedUser.user?.username}/`,
  };

  useEffect(() => {
    setActiveTab((params.tag as Tabs) || "readme");
  }, [params]);

  if (params.tag && !profileTabs.includes(params.tag as Tabs))
    return <ErrorPage />;

  return (
    <div className="flex-auto relative max-w-screen-xl">
      <div className="flex flex-row z-[40] h-fit items-center justify-center w-full sticky top-[5rem] bg-background">
        {profileTabs.map((tab) => (
          <Button
            asChild
            key={`profile-tab-${tab}`}
            variant={"link"}
            onClick={() => setActiveTab(tab)}
            className={`w-1/3 py-2 rounded-none border-b-2 hover:no-underline 
                  ${
                    activeTab === tab
                      ? "border-primary"
                      : "text-secondary-header"
                  }
                  `}
          >
            <Link href={tabLink[tab]} className="capitalize">
              {tab}
            </Link>
          </Button>
        ))}
      </div>
      {children}
    </div>
  );
};

export default ProfileContent;
