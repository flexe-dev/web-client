import ArchivePostModal from "@/components/ui/Posts/Shared/Modals/ArchivePostModal";
import BoostPostModal from "@/components/ui/Posts/Shared/Modals/BoostPostModal";
import DeletePostModal from "@/components/ui/Posts/Shared/Modals/DeletePostModal";
import PinPostModal from "@/components/ui/Posts/Shared/Modals/PinPostModal";
import ReportPostModal from "@/components/ui/Posts/Shared/Modals/ReportPostModal";
import SharePostModal from "@/components/ui/Posts/Shared/Modals/SharePostModal";
import { ChildNodeProps } from "@/lib/interfaces/componentTypes";
import { Post, PostType } from "@/lib/interfaces/postTypes";

const PostToolOptions = [
  "delete",
  "archive",
  "report",
  "share",
  "boost",
  "pin",
] as const;

// Optional Callback Functions passed for each action
export type ModalToolCallback = {
  [tool in PostToolOptionsType]?: () => void;
};

export interface PostToolContextProps extends ChildNodeProps {
  post: Post;
  callbacks?: ModalToolCallback;
}

export interface ToolModalProp {
  post: Post;
  userToken?: string;
  open: boolean;
  modalCloseCallback: () => void;
  parentOptionalCallback?: () => void;
}

export type PostToolOptionsType = (typeof PostToolOptions)[number];

export const PostToolModal: Record<
  PostToolOptionsType,
  (props: ToolModalProp) => JSX.Element
> = {
  delete: DeletePostModal,
  archive: ArchivePostModal,
  report: ReportPostModal,
  share: SharePostModal,
  boost: BoostPostModal,
  pin: PinPostModal,
};

export interface PostOptionToolState {
  tool: PostToolOptionsType | undefined;
  setTool: React.Dispatch<
    React.SetStateAction<PostToolOptionsType | undefined>
  >;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type?: PostType;
}

export const postToolInitialState: PostOptionToolState = {
  tool: undefined,
  setTool: () => {},
  dialogOpen: false,
  setDialogOpen: () => {},
  type: undefined,
};
