"use client";
import Link from "next/link";
import React, { useState, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LinkProps } from "@/lib/interface";
import { SidebarBurger } from "@/components/icons/SidebarBurger";
import { ModeToggle } from "../theme/theme-toggle";
import { Button } from "./button";
import XMarkIcon from "../icons/xMarkIcon";
import { UserPlusIcon } from "@heroicons/react/24/outline";

interface Props {
  links: LinkProps[];
}

function MobileView(props: Props) {
  const { links } = props;
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  return (
    <>
      <footer className="flex justify-between z-[50] md:hidden fixed bottom-12 border-2 border-inverted h-fit w-1/2 backdrop-blur-xl bg-inverted/10 px-3 py-2 rounded-xl mx-auto right-0 left-0">
        <ModeToggle variant="lg" buttonClassName="border-transparent" />
        <SidebarBurger
          callback={setToggleSidebar}
          className="stroke-inverted h-10 w-10 hover:stroke-neutral-600 "
        />
      </footer>
      <AnimatePresence>
        {toggleSidebar ? (
          <LinkSection links={links} setToggleSidebar={setToggleSidebar} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default MobileView;

const mobileLinkVars = {
  initial: {
    translateX: "-100%",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    translateX: "0%",
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.35,
    },
  },
};

const menuVars = {
  initial: {
    opacity: 0,
    scaleY: 0.75,
  },
  animate: {
    opacity: 1,
    scaleY: 1,
    transition: {
      duration: 0.25,
      ease: [0.12, 0, 0.39, 0],
    },
  },
  exit: {
    opacity: 0,
    scaleY: 0.75,
    transition: {
      delay: 0.5,
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
const containerVars = {
  initial: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
};

interface DropdownProps extends Props {
  setToggleSidebar: Dispatch<React.SetStateAction<boolean>>;
}

const LinkSection = (props: DropdownProps) => {
  const { links, setToggleSidebar } = props;
  return (
    <motion.div
      onClick={(e) => {
        setToggleSidebar(false);
      }}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          delay: 1,
        },
      }}
      className="inset-0 fixed h-screen w-screen  bg-neutral-950/90 transition-opacity z-[90]"
    >
      <motion.aside
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`fixed lg:hidden origin-bottom bottom-0 left-0 w-full h-[25rem] bg-primary-foreground transition-colors z-[99] `}
        variants={menuVars}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="w-full flex items-center justify-end">
          <Button
            variant={"ghost"}
            onClick={() => setToggleSidebar((prev) => !prev)}
            className="m-4 itm"
          >
            <XMarkIcon className="w-8 h-8" />
          </Button>
        </div>
        <motion.div
          variants={containerVars}
          initial="initial"
          animate="open"
          exit="initial"
          className="flex flex-col h-full px-12 gap-4 group "
        >
          {links.map((link, index) => {
            return (
              <MobileNavLink
                key={`mobile-link-${index}`}
                label={link.label}
                href={link.href}
                icon={link.icon}
              />
            );
          })}
          {
            <MobileNavLink
              key={`mobile-link-register`}
              label={"Create an Account"}
              icon={<UserPlusIcon className="w-8 h-8" />}
              href={"/register"}
            />
          }
        </motion.div>
      </motion.aside>
    </motion.div>
  );
};

const MobileNavLink = (props: LinkProps) => {
  const { label, href, icon } = props;
  return (
    <motion.div
      variants={mobileLinkVars}
      className="text-3xl font-semibold uppercase text-secondary-header group-hover:text-tertiary hover:group-hover:text-secondary-foreground"
    >
      <Link href={href}>
        <div className="flex space-x-3 w-fit items-center transition-colors">
          <div className="w-8 h-8">{icon}</div>
          <span>{label}</span>
        </div>
      </Link>
    </motion.div>
  );
};
