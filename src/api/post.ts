import { firebaseStore } from "../global";
import {
  collection,
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { z } from "zod";
import { useEffect, useState } from "react";
import { sortBy } from "../utils/arrays";
import { Collection, DateSchema } from "./types";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user";

export const PostSchema = z.object({
  id: z.string(),
  caption: z.string(),
  created: DateSchema,
  image: z.string(),
  hashtags: z.array(z.string()),
  userEmail: z.string(),
});
export type PostSchema = z.infer<typeof PostSchema>;

export type CreatePostInput = {
  caption: string;
  image: string;
  hashtags: string[];
  userEmail: string;
};

export const createPost = async (
  postInput: CreatePostInput
): Promise<PostSchema> => {
  const post = {
    ...postInput,
    id: uuidv4(),
    created: new Date(),
  };

  const postPath = doc(firebaseStore, Collection.POSTS, post.id);
  await setDoc(postPath, post);

  return post;
};

export const deletePost = async (postId: string) => {
  await deleteDoc(doc(firebaseStore, Collection.POSTS, postId));
};
export const updatePost = async (postId: string, post: PostSchema) => {
  await updateDoc(doc(firebaseStore, Collection.POSTS, postId), post);
};

export type Post = {
  id: string;
  index: number;
  caption: string;
  created: Date;
  image: string;
  hashtags: string[];
  user: User;
};

export const useSubscribePosts = ({ user }: { user: User | null }) => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (user === null) return;

    const postsPath = collection(firebaseStore, Collection.POSTS);
    const postsQuery = query(postsPath, where("userEmail", "==", user.email));
    return onSnapshot(postsQuery, (snapshot) => {
      const baseDocs = snapshot.docs.map((doc) => {
        return PostSchema.parse(doc.data());
      });

      const sortedDocs = sortBy(baseDocs, (doc) => doc.created, {
        reverse: true,
      });

      const posts = sortedDocs.map((doc, index): Post => {
        return { 
          ...doc,
          index,
          user,
        };
      });

      setPosts(posts);
    });
  }, [user]);

  return posts;
};
