export interface LinkProps {
  href: string;
  label: string;
}

export interface SidebarButtonProps {
  className?: string;
  callback: React.Dispatch<React.SetStateAction<boolean>>;
}
