import { ChildNodeProps } from "@/lib/interface";
import Link from "next/link";

interface StyledLinkProps extends ChildNodeProps {
  href: string;
  newTab?: boolean;
}
export const StyledWordLink = (props: StyledLinkProps) => {
  const { href, children } = props;
  return (
    <>
      {" "}
      <Link
        href={href}
        target={props.newTab ? "_blank" : "_self"}
        className="text-primary font-semibold animate-pulse group"
      >
        <i>{children}</i>
      </Link>{" "}
    </>
  );
};
