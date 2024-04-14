"use client";

import React, { useState } from "react";
import { useAccount } from "@/components/context/AccountProvider";
import { Button } from "@/components/ui/button";
import { mockprofile } from "@/app/[username]/mock/profile";
import ProfileFollowers from "./ProfileFollowers";
import ProfileDetails from "./ProfileDetails";
import { EditProfileModal } from "./EditProfileModal";
import Image from "next/image";
import { defaultPicture } from "@/lib/utils";
import { UserProfile } from "@prisma/client";
import { User } from "next-auth";
import { userProfileViewer } from "../context/UserProfileProvider";
import { Skeleton } from "../ui/skeleton";

function ProfileHeader() {
  const { fetchedProfile, fetchedUser, loading, isUserProfile } =
    userProfileViewer();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  //Find Profile and User object based on username string

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  return (
    <>
      <div className="rounded-lg lg:sticky p-6 mb-8 top-[6rem]  mx-auto max-w-2xl lg:max-w-xs h-fit">
        <div className="relative">
          <div className="relative z-10 flex justify-center">
            <div className="w-48 h-48 relative">
              {loading ? (
                <Skeleton className="rounded-full w-48 h-48" />
              ) : (
                <Image
                  alt="User Profile Picture"
                  className=" rounded-full"
                  priority
                  src={fetchedUser?.image ?? defaultPicture}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center relative z-10 mt-4">
          {loading ? (
            <>
              <Skeleton className="w-32 h-8 mt-2 rounded-lg" />
              <Skeleton className="w-24 h-4 rounded-lg mt-4" />
              <div className="flex space-x-2">
                <Skeleton className="w-24 h-4 rounded-lg mt-6" />
                <Skeleton className="w-24 h-4 rounded-lg mt-6" />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold text-secondary-foreground">
                {fetchedUser?.name}
              </h1>

              <p className="text-secondary-header my-2">
                @{fetchedUser?.username}
              </p>
              <ProfileFollowers
                followers={mockprofile.profile.followers}
                following={mockprofile.profile.following}
              />
              {isUserProfile && (
                <Button
                  className="mt-6"
                  variant={"outline"}
                  onClick={toggleEditModal}
                >
                  Edit Profile
                </Button>
              )}
            </>
          )}
        </div>
        <ProfileDetails/>
      </div>
      <EditProfileModal open={isEditModalOpen} dispatch={setIsEditModalOpen} />
    </>
  );
}

export default ProfileHeader;
