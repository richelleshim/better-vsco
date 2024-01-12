import { db } from "./global";
import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { z } from "zod";
import { useEffect, useState } from "react";

const POSTS_COLLECTION_NAME = "posts";

const DateSchema = z
  .object({ seconds: z.number(), nanoseconds: z.number() })
  .transform(({ seconds }) => {
    return new Date(seconds * 1000);
  });

type DateSchema = z.infer<typeof DateSchema>;

export const PostSchema = z.object({
  caption: z.string(),
  created: DateSchema,
  image: z.string(),
  hashtags: z.array(z.string()),
});

export type PostSchema = z.infer<typeof PostSchema>;

export type Post = {
  id: string;
  caption: string;
  created: Date;
  image: string;
  hashtags: string[];
};

export type CreatePostInput = {
  caption: string;
  image: string;
  hashtags: string[];
};

export const createPost = async (postInput: CreatePostInput) => {
  const post = {
    ...postInput,
    created: new Date(),
  };

  const doc = await addDoc(collection(db, POSTS_COLLECTION_NAME), post);

  return {
    ...post,
    id: doc.id,
  };
};

export const deletePost = async (postId: string) => {
  await deleteDoc(doc(db, POSTS_COLLECTION_NAME, postId));
};
export const updatePost = async (postId: string, post: PostSchema) => {
  await updateDoc(doc(db, POSTS_COLLECTION_NAME, postId), post);
};

export const useSubscribePosts = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    onSnapshot(collection(db, POSTS_COLLECTION_NAME), (snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        const postDoc = PostSchema.parse(doc.data());
        const post: Post = {
          ...postDoc,
          id: doc.id,
        };
        return post;
      });

      setPosts(posts);
    });
  }, []);

  return posts;
};
