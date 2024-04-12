"use client";

import React, { useState } from "react";
import { useAccount } from "@/components/context/AccountProvider";
import { Button } from "@/components/ui/button";
import { mockprofile } from "../mock/profile";
import ProfileFollowers from "./ProfileFollowers";
import ProfileDetails from "./ProfileDetails";
import { EditProfileModal } from "./EditProfileModal";
import Image from "next/image";
import { defaultPicture } from "@/lib/utils";
function ProfileHeader() {
  const { user, profile } = useAccount();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  return (
    <>
      <div className="rounded-lg lg:sticky p-6 mb-8 top-[6rem]  mx-auto max-w-2xl lg:max-w-xs h-fit">
        <div className="relative">
          <div className="relative z-10 flex justify-center">
            <div className="w-48 h-48 relative">
              <Image
                alt="User Profile Picture"
                className=" rounded-full"
                src={user?.image ?? defaultPicture}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className="text-center justify-center relative z-10 mt-4">
          <h1 className="text-2xl font-semibold text-secondary-foreground">
            {user?.name}
          </h1>
          <p className="text-secondary-header my-2">@{user?.username}</p>
          <ProfileFollowers
            followers={mockprofile.profile.followers}
            following={mockprofile.profile.following}
          />
          <Button
            className="mt-6"
            variant={"outline"}
            onClick={toggleEditModal}
          >
            Edit Profile
          </Button>
        </div>
        <ProfileDetails
          bio={mockprofile.profile.bio}
          currentJob={profile?.job ?? undefined}
          company={profile?.company ?? undefined}
          pronouns={profile?.pronouns ?? undefined}
          location={profile?.location ?? undefined}
        />
      </div>
      <EditProfileModal open={isEditModalOpen} dispatch={setIsEditModalOpen} />
    </>
  );
}

export default ProfileHeader;
