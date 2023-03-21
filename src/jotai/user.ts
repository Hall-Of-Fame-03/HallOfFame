import { atom } from "jotai";
import { type User } from "@prisma/client";

export const userAtom = atom<User | null>(null);
