import { useState } from "react";

import {
  CssVarsProvider,
  Container,
  Stack,
  Typography,
  ListItemButton,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  useTheme,
  Button,
} from "@mui/joy";
import { Post, useSubscribePosts } from "./api";
import { ProfilePhoto } from "./ProfilePhoto";
import { theme } from "./theme";
import { FullPostDisplay } from "./FullPostDisplay";
import { MoreHoriz, FlagRounded, AddSharp } from "@mui/icons-material";
import { CreatePostModal } from "./createPostModal";

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
  const [postIndex, setPostIndex] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { palette } = useTheme();

  const posts = useSubscribePosts();

  if (posts === null) return null;

  const buckets = bucketPosts(posts);

  return (
    <CssVarsProvider theme={theme}>
      {postIndex === null ? (
        <>
          <Stack alignItems="center" spacing={2} mb={5}>
            <ProfilePhoto />
            <Stack direction="row" alignItems="center" spacing={0}>
              <Typography level="h1" fontSize="sm">
                richelleshim
              </Typography>
              <Dropdown>
                <MenuButton variant="plain">
                  <MoreHoriz />
                </MenuButton>
                <Menu>
                  <MenuItem
                    onClick={() => {
                      setIsCreating(true);
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography sx={{ fontSize: "10px" }}>
                        <AddSharp />
                      </Typography>
                      <Typography level="body-xs">Create Post</Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography sx={{ fontSize: "10px" }}>
                        <FlagRounded />
                      </Typography>
                      <Typography level="body-xs">Report</Typography>
                    </Stack>
                  </MenuItem>
                </Menu>
              </Dropdown>
            </Stack>
            <Typography level="body-sm">richelleshim</Typography>
            <Stack alignItems="center" spacing={0.2}>
              <Typography level="body-xs">ABOUT</Typography>
              <Typography level="body-xs">bio</Typography>
            </Stack>
            <Button>
              <Typography level="title-sm" sx={{ color: "white" }}>
                FOLLOW
              </Typography>
            </Button>
          </Stack>
          <Container maxWidth="lg">
            <Stack direction="row" spacing={3}>
              {buckets.map((bucket, i) => {
                return (
                  <Stack spacing={3} key={i}>
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
        </>
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
      {isCreating && (
        <CreatePostModal
          open={isCreating}
          onClose={() => {
            setIsCreating(false);
          }}
        />
      )}
    </CssVarsProvider>
  );
};
