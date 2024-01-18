import { z } from "zod"

export enum Collection {
  POSTS = "posts",
  USERS = "users",
}

export enum Folder {
  POST_IMAGES = "post-images",
  PROFILE_PICTURES = "profile-pictures",
}

export const DateSchema = z
  .object({ seconds: z.number(), nanoseconds: z.number() })
  .transform(({ seconds }) => {
    return new Date(seconds * 1000)
  })
export type DateSchema = z.infer<typeof DateSchema>
