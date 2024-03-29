import { useState } from "react";

import {
  Container,
  Stack,
  Typography,
  ListItemButton,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Button
} from "@mui/joy";
import { Post, useSubscribePosts } from "./api/post";
import { MoreHoriz, AddSharp, Logout } from "@mui/icons-material";
import { firebaseAuth } from "./global";
import { signOut } from "firebase/auth";
import { FullPostDisplay } from "./full-post-display";
import { CreatePostModal } from "./create-post-modal";
import { User, useSubscribeUsers } from "./api/user";
import { ProfilePhoto } from "./profile-photo";
import { EditProfilePictureModal } from "./edit-profile-picture-modal";

const bucketPosts = (posts: Post[]) => {
  const buckets: Post[][] = [[], [], [], [], []];

  posts.forEach((post, index) => {
    const bucketIndex = index % 5;
    const bucket = buckets[bucketIndex];
    bucket.push(post);
  });

  return buckets;
};

export const Profile = ({
  email,
  onUserChange,
}: {
  email: string;
  onUserChange: (user: User) => void;
}) => {
  const users = useSubscribeUsers();

  const [postIndex, setPostIndex] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditingPfp, setIsEditingPfp] = useState(false);
  const [isViewingUsers, setIsViewingUsers] = useState(false);

  const user =
    users?.find((user) => {
      return email === user.email;
    }) ?? null;

  const posts = useSubscribePosts({ user });

  if (posts === null) return null;
  if (user === null) return null;
  if (users === null) return null;

  const buckets = bucketPosts(posts);

  return (
    <>
      {postIndex === null ? (
        <>
          <Stack alignItems="center" spacing={1} mb={5} marginTop={15}>
            <ProfilePhoto
              image={user.profilePictureURL}
              onClick={() => {
                setIsEditingPfp(true);
              }}
            />
            <Stack direction="row" alignItems="center" spacing={0}>
              <Typography level="h1" fontSize="sm">
                {user.username}
              </Typography>
              <Dropdown>
                <MenuButton variant="plain" sx={{ paddingX: "2px", paddingY: "2px" }}>
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
                  <MenuItem
                    onClick={() => {
                      signOut(firebaseAuth);
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography sx={{ fontSize: "10px" }}>
                        <Logout />
                      </Typography>
                      <Typography level="body-xs">Sign Out</Typography>
                    </Stack>
                  </MenuItem>
                </Menu>
              </Dropdown>
            </Stack>
            <Typography level="body-sm">{user.username}</Typography>
            {user.about && (
              <Stack alignItems="center" spacing={0.2}>
                <Typography level="body-xs">ABOUT</Typography>
                <Typography level="body-xs">{user.about}</Typography>
              </Stack>
            )}
            <Button>
              <Typography level="title-sm" sx={{ color: "white" }}>
                FOLLOW
              </Typography>
            </Button>
          </Stack>
          <Stack>
            <Stack alignItems="center" pb={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Button
                  variant={!isViewingUsers ? "solid" : "plain"}
                  onClick={() => {
                    setIsViewingUsers(false);
                  }}
                >
                  Gallery
                </Button>
                <Button
                  variant={isViewingUsers ? "solid" : "plain"}
                  onClick={() => {
                    setIsViewingUsers(true);
                  }}
                >
                  Collection
                </Button>
              </Stack>
            </Stack>
          </Stack>
          {isViewingUsers ? (
            <Container maxWidth="lg">
              <Stack direction="row" spacing={1}>
                {users.map((user) => {
                  return (
                    <div
                      onClick={() => {
                        onUserChange(user);
                        setIsViewingUsers(false);
                      }}
                    >
                      <Stack
                        spacing={1}
                        sx={{
                          ":hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        <img width="200px" src={user.profilePictureURL} />
                        <Typography>{user.username}</Typography>
                      </Stack>
                    </div>
                  );
                })}
              </Stack>
            </Container>
          ) : (
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
          )}
        </>
      ) : (
        <FullPostDisplay
          post={posts[Math.min(postIndex, posts.length - 1)]}
          onClose={() => {
            setPostIndex(null);
          }}
          onPrev={postIndex === 0 ? null : () => setPostIndex(postIndex - 1)}
          onNext={postIndex === posts.length - 1 ? null : () => setPostIndex(postIndex + 1)}
        />
      )}
      {isCreating && (
        <CreatePostModal
          user={user}
          open={isCreating}
          onClose={() => {
            setIsCreating(false);
          }}
        />
      )}
      {isEditingPfp && (
        <EditProfilePictureModal
          user={user}
          open={isEditingPfp}
          onClose={() => {
            setIsEditingPfp(false);
          }}
        />
      )}
    </>
  );
};

//to do: let's make profile picture changable when clicked
//
