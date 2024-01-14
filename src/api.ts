import { db, fileStorage } from "./global";
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
import { sortBy } from "./utils/arrays";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

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
  index: number;
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
      const baseDocs = snapshot.docs.map((doc) => {
        return {
          ...PostSchema.parse(doc.data()),
          id: doc.id,
        };
      });

      const sortedDocs = sortBy(baseDocs, (doc) => doc.created, {
        reverse: true,
      });

      const posts = sortedDocs.map((doc, index): Post => {
        return {
          ...doc,
          index,
        };
      });

      setPosts(posts);
    });
  }, []);

  return posts;
};

const postImagePath = ref(fileStorage, "post-images/");

export const uploadPostImage = async (file: File) => {
  const fileName = uuidv4();
  const imagePath = ref(postImagePath, fileName);
  await uploadBytes(imagePath, file);

  const imageURL = await getDownloadURL(imagePath);
  return imageURL;
};
