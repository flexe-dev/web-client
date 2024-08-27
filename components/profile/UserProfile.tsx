import { ChildNodeProps, UserAccount, UserNode } from "@/lib/interface";
import { ProfileViewerProvider } from "../context/ProfileViewUserProvider";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

interface Props extends ChildNodeProps {
  account: UserAccount | null;
  node?: UserNode;
}

export const UserProfile: React.FC<Props> = ({ children, account, node }) => {
  return (
    <ProfileViewerProvider>
      <div className="relative w-full justify-center px-4 py-8 flex flex-col lg:flex-row gap-8">
        <ProfileHeader />
        <ProfileContent>{children}</ProfileContent>
      </div>
    </ProfileViewerProvider>
  );
};
