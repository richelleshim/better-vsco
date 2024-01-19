import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "./use-auth";
import { Box, Button, CircularProgress, Container, Stack, Typography } from "@mui/joy";
import { createUser, User } from "./api/user";
import { firebaseAuth } from "./global";
import { Profile } from "./profile";
import { Google } from "@mui/icons-material";
import { SignUpDisplay } from "./sign-up-display";
import { uploadPostImage } from "./api/storage";
import { useState } from "react";

const defaultProfilePictureURLs = [
  "https://firebasestorage.googleapis.com/v0/b/better-vsco.appspot.com/o/assets%2Fdefault-profile-pics%2FScreenshot%202024-01-07%20at%209.03.56%20PM.png?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/better-vsco.appspot.com/o/assets%2Fdefault-profile-pics%2FScreenshot%202024-01-13%20at%205.29.39%20PM.png?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/better-vsco.appspot.com/o/assets%2Fdefault-profile-pics%2FScreenshot%202024-01-15%20at%201.02.46%20PM.png?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/better-vsco.appspot.com/o/assets%2Fdefault-profile-pics%2FScreenshot%202024-01-15%20at%201.03.06%20PM.png?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/better-vsco.appspot.com/o/assets%2Fdefault-profile-pics%2FScreenshot%202024-01-15%20at%201.04.01%20PM.png?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/better-vsco.appspot.com/o/assets%2Fdefault-profile-pics%2FScreenshot%202024-01-15%20at%2012.59.29%20PM.png?alt=media",
];

const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomProfilePictureURL = () => {
  const index = randomInteger(0, 5);
  return defaultProfilePictureURLs[index];
};
const googleProvider = new GoogleAuthProvider();

export const App = () => {
  const { authState, refetch, ready } = useAuth();
  const { firebaseUser, user } = authState;
  const [viewingUser, setViewingUser] = useState<User | null>(null);

  const onLogInGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider);
  };

  if (!ready)
    return (
      <Stack
        height="100vh"
        width="100vw"
        alignItems="center"
        justifyContent="center"
        position="absolute"
      >
        <CircularProgress variant="plain" />;
      </Stack>
    );

  if (firebaseUser?.email == null)
    return (
      <Stack
        height="100vh"
        width="100vw"
        alignItems="center"
        justifyContent="center"
        position="absolute"
      >
        <Stack spacing={2} width="300px">
          <Typography level="body-lg">Log into your account</Typography>
          <Button
            sx={{ borderRadius: "100px" }}
            onClick={async () => {
              onLogInGoogle();
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="100vw">
              Log in with Google
              <Google />
            </Stack>
          </Button>
        </Stack>
      </Stack>
    );

  if (user === null)
    return (
      <SignUpDisplay
        onSignUp={async (username, profilePictureFile) => {
          if (firebaseUser.email === null) return;

          const imageURL =
            profilePictureFile === null
              ? randomProfilePictureURL()
              : await uploadPostImage(profilePictureFile);

          await createUser({
            email: firebaseUser.email,
            username,
            about: null,
            profilePictureURL: imageURL,
          });

          refetch();
        }}
      />
    );

  const email = viewingUser?.email ?? user.email;

  return (
    <Stack>
      <Box
        marginLeft={2}
        marginTop={1}
        sx={{
          ":hover": {
            cursor: "pointer",
          },
        }}
      >
        <img src="/logo.png" width="25px" height="30px"  />
      </Box>
      <Profile
        email={email}
        onUserChange={(viewingUser) => {
          setViewingUser(viewingUser);
        }}
      />
    </Stack>
  );
};
