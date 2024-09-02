"use client";

import Link from "next/link";

interface ProfileFollowersProps {
  followers?: number;
  following?: number;
  username?: string;
}

const ProfileFollowers = ({
  followers,
  following,
  username,
}: ProfileFollowersProps) => {
  if (!username) return null;
  return (
    <div className="flex flex-row mt-1 justify-center text-center items-center">
      <Link href={`/network/${username}?tab=followers`}>
        <p className="text-xs text-secondary-foreground mx-1 font-bold hover:text-tertiary transition-colors">
          {followers ?? 0} followers
        </p>
      </Link>
      {"•"}
      <Link href={`/network/${username}?tab=following`}>
        <p className="text-xs text-secondary-foreground mx-1 font-bold hover:text-tertiary transition-colors">
          {following ?? 0} following
        </p>
      </Link>
    </div>
  );
};

export default ProfileFollowers;
