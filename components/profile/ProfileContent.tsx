"use client";

import { Button } from "@/components/ui/Shared/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ErrorPage from "../Error";
import { useProfileUserViewer } from "../context/UserInteraction/ProfileViewUserProvider";
import { ChildNodeProps } from "@/lib/interfaces/componentTypes";

export const profileTabs = ["readme", "posts", "activity"] as const;
export type Tabs = (typeof profileTabs)[number];

const ProfileContent: React.FC<ChildNodeProps> = ({ children }) => {
  const { fetchedUser } = useProfileUserViewer();
  const params = useParams<{ username: string; tag: string }>();
  const [activeTab, setActiveTab] = useState<Tabs>(
    (params.tag as Tabs) || "readme"
  );

  const tabLink: Record<Tabs, string> = {
    activity: `/${fetchedUser?.user?.username}/activity`,
    posts: `/${fetchedUser?.user?.username}/posts`,
    readme: `/${fetchedUser?.user?.username}/`,
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
