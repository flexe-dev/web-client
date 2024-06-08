export const mobileHeaderVars = {
  initial: {
    translateX: "-150%",
    transition: {
      duration: 0.25,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    translateX: "0%",
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.15,
    },
  },
};

export const mobileLinkVars = {
  initial: {
    translateX: "-150%",
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

export const menuVars = {
  initial: {
    opacity: 0,
    scaleX: 0.75,
  },
  animate: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.25,
      ease: [0.12, 0, 0.39, 0],
    },
  },
  exit: {
    opacity: 0,
    scaleX: 0.75,
    transition: {
      delay: 0.25,
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
export const containerVars = {
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
