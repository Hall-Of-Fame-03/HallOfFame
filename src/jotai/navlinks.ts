import { atom } from "jotai";

const navLinks = [
  { title: "Home", active: true, link: "/" },
  {
    title: "Your Achievements",
    active: false,

    link: "/achievements",
  },
  { title: "About", active: false, link: "/about" },
  {
    title: "Add Achievement",
    active: false,

    link: "/addachievement",
  },
];

export const navLinksAtom = atom(navLinks);

export const showUserAchievementsAtom = atom(false);
