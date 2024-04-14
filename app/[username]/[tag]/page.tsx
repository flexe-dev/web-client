"use client";
import React from "react";
import { useParams } from "next/navigation";
import Portfolio from "@/components/profile/Portfolio";
import { Activity } from "@/components/profile/Activity";
import ErrorPage from "@/components/Error";

const renderedComponent: Record<string, React.ReactNode> = {
  portfolio: <Portfolio />,
  activity: <Activity />,
};

const page = () => {
  const params = useParams();
  const { tag } = params;
  return renderedComponent[tag as string] || <ErrorPage />;
};

export default page;
