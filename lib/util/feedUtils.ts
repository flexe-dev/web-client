import { FeedDisplayReference, OriginReferenceLookup } from "../interface";

export const SortUserFeed = (references: FeedDisplayReference[]) => {
  const unreadPosts = references.filter((ref) => !ref.userFeed.readStatus);
  const readPosts = references.filter((ref) => ref.userFeed.readStatus);
  return [
    ...SortByReferenceDate(unreadPosts),
    ...SortByReferenceDate(readPosts),
  ];
};

const SortByReferenceDate = (references: FeedDisplayReference[]) => {
  return references.sort(
    (a, b) =>
      getMostRecentRecipientReferenceDate(b.recipientReferences).getTime() -
      getMostRecentRecipientReferenceDate(a.recipientReferences).getTime()
  );
};

const getMostRecentRecipientReferenceDate = (
  references: OriginReferenceLookup[]
): Date => {
  return new Date(
    Math.max(...references.map((ref) => new Date(ref.referenceDate).getTime()))
  );
};
