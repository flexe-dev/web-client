"use client";

import React, { useState } from "react";
import { useAccount } from "@/components/context/AccountProvider";
import { Button } from "@/components/ui/button";
import { mockprofile } from "../mock/profile";
import ProfileFollowers from "./ProfileFollowers";
import ProfileDetails from "./ProfileDetails";
import { EditProfileModal } from "./EditProfileModal";

function ProfileHeader() {
  const { user } = useAccount();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="rounded-lg p-6 mb-8 relative mx-auto max-w-2xl lg:max-w-xs">
        <div className="relative">
          <div className="relative z-10 flex justify-center">
            <img
              src={user?.image}
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-white"
            />
          </div>
        </div>
        <div className="text-center justify-center relative z-10 mt-4">
          <h1 className="text-2xl font-semibold text-secondary-foreground">
            {user?.name}
          </h1>
          <p className="text-secondary-foreground my-2">{user?.username}</p>
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
          currentJob={user?.job}
          company={user?.company}
          pronouns={user?.pronouns}
          location={user?.location}
        />
      </div>
      {isEditModalOpen && <EditProfileModal onClose={closeModal} />}
    </>
  );
}

export default ProfileHeader;
