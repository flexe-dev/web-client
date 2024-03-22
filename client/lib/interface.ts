export interface ClassNameProp {
  className?: string;
}

export interface LinkProps {
    href: string;
    label: string;
  }
  
  export interface SidebarButtonProps extends ClassNameProp {
    callback: React.Dispatch<React.SetStateAction<boolean>>;
  }
  