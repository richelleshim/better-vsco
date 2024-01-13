import { useState } from "react";

import {
  Button,
  CssVarsProvider,
  Container,
  Input,
  Stack,
  Typography,
  Box,
  ListItemButton,
} from "@mui/joy";
import { createPost, CreatePostInput, Post, useSubscribePosts } from "./api";
import { PostDisplay } from "./PostDisplay";
import { ProfilePhoto } from "./ProfilePhoto";
import { theme } from "./theme";
import { sortBy } from "./utils/arrays";
import { FullPostDisplay } from "./FullPostDisplay";

const initialPostInput: CreatePostInput = {
  caption: "",
  image: "",
  hashtags: [],
};

/*
under image
delete button -> deletes image

choose a google font
*/

const bucketPosts = (posts: Post[]) => {
  const buckets: Post[][] = [[], [], [], [], []];

  posts.forEach((post, index) => {
    const bucketIndex = index % 5;
    const bucket = buckets[bucketIndex];
    bucket.push(post);
  });

  return buckets;
};

export const App = () => {
  const [postInput, setPostInput] = useState<CreatePostInput>(initialPostInput);
  const [postIndex, setPostIndex] = useState<number | null>(null);

  const posts = useSubscribePosts();

  if (posts === null) return null;

  const buckets = bucketPosts(posts);

  return (
    <CssVarsProvider theme={theme}>
      {postIndex === null ? (
        <Stack>
          <Stack alignItems="center" spacing={1}>
            <ProfilePhoto />
            <Typography level="body-sm" fontWeight="lg">
              richelleshim
            </Typography>
            <Typography level="body-sm" fontStyle="bold">
              richelleshim
            </Typography>
            <Typography level="body-sm">ABOUT</Typography>
            <Typography level="body-sm">bio</Typography>
          </Stack>
          <Container maxWidth="lg">
            <Stack direction="row" spacing={3}>
              {buckets.map((bucket) => {
                return (
                  <Stack spacing={3}>
                    {bucket.map((post) => {
                      return (
                        <ListItemButton
                          key={post.id}
                          onClick={() => {
                            setPostIndex(post.index);
                          }}
                        >
                          <img src={post.image} width="200px" />
                        </ListItemButton>
                      );
                    })}
                  </Stack>
                );
              })}
            </Stack>
          </Container>
        </Stack>
      ) : (
        <FullPostDisplay
          post={posts[Math.min(postIndex, posts.length - 1)]}
          onClose={() => {
            setPostIndex(null);
          }}
          onPrev={postIndex === 0 ? null : () => setPostIndex(postIndex - 1)}
          onNext={
            postIndex === posts.length - 1
              ? null
              : () => setPostIndex(postIndex + 1)
          }
        />
      )}
    </CssVarsProvider>
  );
};
