"use client";

import { FindAccountByUserId } from "@/controllers/UserController";
import { ChildNodeProps, UserAccount } from "@/lib/interface";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface AccountProviderState {
  account: UserAccount | null;
  setAccount: Dispatch<SetStateAction<UserAccount | null>>;
}

const initialState: AccountProviderState = {
  account: null,
  setAccount: () => {},
};

export const AccountContext = createContext<AccountProviderState>(initialState);

export const AccountProvider = ({ children }: ChildNodeProps) => {
  const session = useSession();
  const [account, setAccount] = useState<UserAccount | null>(null);

  const fetchProfile = async () => {
    if (!session.data?.user) return; // No user ID available

    try {
      const account = await FindAccountByUserId(session.data.user.id);
      setAccount(account);
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
        account,
        setAccount,
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
