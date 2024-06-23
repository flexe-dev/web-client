import React from "react";
import { useProfileViewer } from "../context/UserProfileProvider";
import TextPostPreview from "../ui/Posts/textPostPreview";

export const Activity = () => {
  const { fetchedAccount } = useProfileViewer();

  console.log(fetchedAccount);

  return (
    <div className="w-full h-[200dvh] mt-4">
      {fetchedAccount?.textPosts.toReversed().map((post, index) => (
        <TextPostPreview
          user={fetchedAccount.user}
          textpost={post}
          idx={index}
        />
      ))}
    </div>
  );
};
