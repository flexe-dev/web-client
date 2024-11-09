import { PencilIcon } from "@heroicons/react/24/outline";

export interface ClassNameProp {
  className?: string;
}

export interface LinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  restrict?: boolean;
}

export interface ModalInteractionProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type IconType = typeof PencilIcon;
export interface ModalProps {
  open: boolean;
  callback: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SidebarButtonProps extends ClassNameProp {
  callback: React.Dispatch<React.SetStateAction<boolean>>;
  mobile?: boolean;
}

export interface ChildNodeProps {
  children?: React.ReactNode;
}
