"use client";

import React from "react";

interface ProfileFollowersProps {
  followers: number;
  following: number;
}

const ProfileFollowers = ({ followers, following }: ProfileFollowersProps) => {
  return (
    <div className="flex flex-row mt-1 justify-center text-center items-center">
      <p className="text-xs text-secondary-foreground mx-1">
        {followers} followers
      </p>
      {"•"}
      <p className="text-xs text-secondary-foreground mx-1">
        {following} following
      </p>
    </div>
  );
};

export default ProfileFollowers;
