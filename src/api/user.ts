import { firebaseStore } from "../global";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { z } from "zod";
import { Collection } from "./types";

export const UserSchema = z.object({
  email: z.string(),
  username: z.string(),
  about: z.string().nullable(),
  reportCount: z.number(),
  profilePictureURL: z.string(),
});
export type UserSchema = z.infer<typeof UserSchema>;

export type User = UserSchema;

type CreateUserInput = {
  email: string;
  username: string;
  about: string | null;
  profilePictureURL: string;
};

export const createUser = async ({
  email,
  username,
  about,
  profilePictureURL,
}: CreateUserInput): Promise<User> => {
  const user = {
    email,
    username,
    about,
    reportCount: 0,
    profilePictureURL
  };

  const userPath = doc(firebaseStore, Collection.USERS, email);

  await setDoc(userPath, user);

  return user;
};

export const getUser = async (email: string) => {
  const userPath = doc(firebaseStore, Collection.USERS, email);
  const userDoc = await getDoc(userPath);
  const userData = userDoc.data();

  return userData === undefined ? null : UserSchema.parse(userData);
};
