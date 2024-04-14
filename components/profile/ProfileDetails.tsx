"use client";

import React from "react";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "lucide-react";
import { Building } from "lucide-react";
import { CircleDashed } from "lucide-react";

interface ProfileDetailsProps {
  bio: string;
  currentJob?: string;
  company?: string;
  pronouns?: string;
  location?: string;
}

const Separator = () => {
  return (
    <hr className="my-4 h-0.5 bg-neutral-100 opacity-100 dark:opacity-10" />
  );
};

const ProfileDetails = ({
  bio,
  currentJob,
  company,
  pronouns,
  location,
}: ProfileDetailsProps) => {
  const profileDetails = [
    {
      detail: currentJob,
      icon: <BriefcaseIcon className="stroke-secondary-header w-5 h-5" />,
    },
    {
      detail: company,
      icon: <Building className="stroke-secondary-header w-5 h-5" />,
    },
    {
      detail: pronouns,
      icon: <CircleDashed className="stroke-secondary-header w-5 h-5" />,
    },
    {
      detail: location,
      icon: <MapPinIcon className="stroke-secondary-header w-5 h-5" />,
    },
  ];

  return (
    <div className="flex flex-col mt-1">
      <Separator />
      <p className="text-xs text-gray-200 text-wrap text-secondary-foreground">
        {bio}
      </p>
      <Separator />
      {profileDetails.map((item, index) => {
        if (item.detail) {
          return (
            <div
              key={`profile-item-${index}`}
              className="flex flex-row align-center items-center my-1"
            >
              {item.icon}
              <p className="ml-2 text-xs text-secondary-foreground">
                {" "}
                {item.detail}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ProfileDetails;
