"use client";

import { FindProfileByUserId } from "@/controllers/ProfileController";
import { User, UserProfile } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useMemo } from "react";

interface AccountProviderState {
  user: User | undefined;
  profile: UserProfile | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | undefined>>;
}

const initialState: AccountProviderState = {
  user: undefined,
  profile: undefined,
  setUser: () => {},
  setProfile: () => {},
};

export const AccountContext = createContext<AccountProviderState>(initialState);

interface Props {
  children: React.ReactNode;
}

export const AccountProvider = ({ children }: Props) => {
  const session = useSession();
  const [user, setUser] = React.useState<User | undefined>(
    session.data?.user as User
  );
  const [profile, setProfile] = React.useState<UserProfile | undefined>(
    undefined
  );

  const fetchProfile = async () => {
    if (!user) return; // No user ID available

    try {
      const userData = session.data?.user;
      if (userData) {
        const userProfile = await FindProfileByUserId(userData.id);
        setProfile(userProfile ? userProfile : undefined);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [session.data?.user]);

  return (
    <AccountContext.Provider
      value={{
        user,
        profile,
        setUser,
        setProfile,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = React.useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};
