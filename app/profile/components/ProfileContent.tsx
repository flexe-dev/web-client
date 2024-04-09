"use client";

import React, { useState } from "react";
interface Feed {
  id: number;
  title: string;
  content: string;
}

const ProfileContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("portfolio");
  const [feeds, setFeeds] = useState<Feed[]>([]);

  const fetchFeeds = (category: string) => {
    // Simulated API call to fetch feeds based on category
    if (category === "portfolio") {
      setFeeds([
        {
          id: 1,
          title: "Portfolio Feed 1",
          content: "Content of portfolio feed 1",
        },
        {
          id: 2,
          title: "Portfolio Feed 2",
          content: "Content of portfolio feed 2",
        },
        // Add more portfolio feeds as needed
      ]);
    } else if (category === "activity") {
      setFeeds([
        {
          id: 1,
          title: "Activity Feed 1",
          content: "Content of activity feed 1",
        },
        {
          id: 2,
          title: "Activity Feed 2",
          content: "Content of activity feed 2",
        },
        // Add more activity feeds as needed
      ]);
    } else if (category === "readme") {
      setFeeds([
        { id: 1, title: "readme 1", content: "Content of readme 1" },
        // Add more activity feeds as needed
      ]);
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    fetchFeeds(tab);
  };

  return (
    <div className="flex-auto">
      <div className="flex flex-row items-center justify-center w-full">
        <button
          className={`w-1/3 py-2 ${
            activeTab === "readme"
              ? "border-b-2 border-secondary-foreground text-secondary-foreground"
              : "border-b border-secondary-header text-secondary-header"
          } `}
          onClick={() => handleTabClick("readme")}
        >
          Read.me
        </button>
        <button
          className={`w-1/3 py-2 ${
            activeTab === "portfolio"
              ? "border-b-2 border-secondary-foreground text-secondary-foreground"
              : "border-b border-secondary-header text-secondary-header"
          } `}
          onClick={() => handleTabClick("portfolio")}
        >
          Portfolio
        </button>
        <button
          className={`w-1/3 py-2 ${
            activeTab === "activity"
              ? "border-b-2 border-secondary-foreground text-secondary-foreground"
              : "border-b border-secondary-header text-secondary-header"
          } `}
          onClick={() => handleTabClick("activity")}
        >
          Activity
        </button>
      </div>
      <div className="flex flex-col items-center justify-center mt-5">
        <h2>
          {activeTab === "portfolio" ? "Portfolio Feeds" : "Activity Feeds"}
        </h2>
        <ul>
          {feeds.map((feed) => (
            <li key={feed.id}>
              <h3>{feed.title}</h3>
              <p>{feed.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileContent;
