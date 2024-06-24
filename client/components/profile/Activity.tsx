import React from "react";
import { useProfileViewer } from "../context/UserProfileProvider";
import TextPostPreview from "../ui/Posts/textPostPreview";

export const Activity = () => {
  const { fetchedAccount } = useProfileViewer();

  return (
    <div className="w-full mt-4">
      {fetchedAccount?.textPosts.toReversed().map((post, index) => (
        <TextPostPreview
          user={fetchedAccount.user}
          textpost={post}
          key={index}
        />
      ))}
    </div>
  );
};
