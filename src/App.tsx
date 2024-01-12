import { useState } from "react";

import {
  Button,
  CssVarsProvider,
  Container,
  Input,
  Stack,
  Typography,
  Box,
  Drawer,
} from "@mui/joy";
import { createPost, CreatePostInput, Post, useSubscribePosts } from "./api";
import { PostDisplay } from "./PostDisplay";
import { ProfilePhoto } from "./ProfilePhoto";
import { theme } from "./theme";
import { sortBy } from "./utils/arrays";

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
  const posts = useSubscribePosts();

  if (posts === null) return null;

  const shownPosts = sortBy(
    posts,
    (post) => {
      return post.created;
    },
    { reverse: true }
  );

  const buckets = bucketPosts(shownPosts);

  return (
    <CssVarsProvider theme={theme}>
      <Stack direction="row">
        <Container fixed>
          <Box sx={{ bgcolor: "#000000", height: "100%" }}> </Box>
          <Stack spacing={2} mb={4} direction="row">
            <Input
              placeholder="Image"
              value={postInput.image}
              size="lg"
              onChange={(event) => {
                const url = event.target.value;
                const post = {
                  ...postInput,
                  image: url,
                };
                setPostInput(post);
              }}
            />
            <Button
              variant="solid"
              onClick={() => {
                createPost(postInput);
                setPostInput(initialPostInput);
              }}
            >
              + New Post
            </Button>
          </Stack>
        </Container>
        <Stack>
          <Stack alignItems="center" spacing={1}>
            <ProfilePhoto />
            <Typography level="body-sm" fontWeight="lg">
              richelleshim
            </Typography>
            <Typography level="body-sm" fontStyle={"bold"}>
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
                      return <PostDisplay post={post} key={post.id}/>;
                    })}
                  </Stack>
                );
              })}
            </Stack>
          </Container>
        </Stack>
      </Stack>
    </CssVarsProvider>
  );
};
