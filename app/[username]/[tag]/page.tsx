"use client";
import ErrorPage from "@/components/Error";
import { Activity } from "@/components/profile/Activity";
import Posts from "@/components/profile/Posts";
import { useParams } from "next/navigation";
import React from "react";

const renderedComponent: Record<string, React.ReactNode> = {
  activity: <Activity />,
  posts: <Posts />,
};

const page = () => {
  const params = useParams();
  const { tag } = params;
  return renderedComponent[tag as string] || <ErrorPage />;
};

export default page;
