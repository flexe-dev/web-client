"use client";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LinkProps } from "@/navigation";
import { SidebarBurger } from "@/SidebarBurger";

interface Props {
  links: LinkProps[];
}

function MobileView(props: Props) {
  const { links } = props;
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <>
      <section className="flex lg:hidden">
        <SidebarBurger
          callback={setToggleSidebar}
          className="stroke-inverted h-10 hover:stroke-neutral-600 transition-colors"
        />

        <AnimatePresence>
          {toggleSidebar ? (
            <motion.aside
              className={`fixed lg:hidden origin-top top-0 left-0 w-full h-screen bg-primary transition-colors z-40`}
              variants={menuVars}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="h-[5rem] flex justify-end px-8">
                <SidebarBurger callback={setToggleSidebar} />
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className={cn(
                  "flex flex-col h-full py-[10rem] items-center gap-4 "
                )}
              >
                {links.map((link, index) => {
                  return (
                    <div className="overflow-hidden">
                      <MobileNavLink
                        key={index}
                        label={link.label}
                        href={link.href}
                      />
                    </div>
                  );
                })}
              </motion.div>
            </motion.aside>
          ) : null}
        </AnimatePresence>
      </section>
    </>
  );
}

export default MobileView;

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};

const MobileNavLink = (props: LinkProps) => {
  const { label, href } = props;
  return (
    <motion.div
      variants={mobileLinkVars}
      className="text-5xl font-semibold uppercase text-inverted-foreground "
    >
      <Link href={href}>{label}</Link>
    </motion.div>
  );
};
