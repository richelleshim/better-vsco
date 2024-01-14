import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "./useAuth";
import { Box, Button, IconButton, Stack, Typography } from "@mui/joy";
import { TextInput } from "./components/text-input";
import { useState } from "react";
import { createUser } from "./api";
import { firebaseAuth } from "./global";
import { Profile } from "./Profile";
import { ArrowBackRounded, Google } from "@mui/icons-material";

const googleProvider = new GoogleAuthProvider();

export const App = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const result = useAuth();
  const { authState, refetch } = result;
  const { firebaseUser, user } = authState;
  const [userName, setUserName] = useState("");

  const onLogInGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider);
  };

  if (firebaseUser?.email == null || isSignIn === true)
    return (
      <Stack>
        <Stack
          height="100vh"
          width="100vw"
          alignItems="center"
          justifyContent="center"
        >
          <Stack spacing={2}>
            <Typography level="body-lg">Log into your account</Typography>
            <Button
              sx={{ borderRadius: "100px", width: "20vw" }}
              onClick={() => {
                onLogInGoogle();
                setIsSignIn(false);
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100vw"
              >
                Log in with Google
                <Google />
              </Stack>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    );

  const onSignUp = async () => {
    if (firebaseUser.email === null) return;

    await createUser({
      email: firebaseUser.email,
      username: userName,
      about: null,
    });

    refetch();
  };

  if (user === null)
    return (
      <Stack direction="row">
        <Stack
          height="100vh"
          width="30vw"
          justifyContent="center"
          alignItems="flex-start"
          sx={{ backgroundColor: "black" }}
          spacing={4}
        >
          <Stack direction="row">
            <IconButton variant="richelle" onClick={()=>{setIsSignIn(true)}}>
              <ArrowBackRounded sx={{ color: "white" }} />
              <Typography sx={{ color: "white" }} >Back</Typography>
            </IconButton>
          </Stack>
        </Stack>

        <Stack
          height="100vh"
          width="40vw"
          alignItems="center"
          justifyContent="center"
          sx={{ backgroundColor: "white" }}
          spacing={4}
        >
          <Typography level="h3" sx={{ color: "black" }}>
            Complete Sign Up
          </Typography>
          <Stack spacing={2}>
            <Typography level="body-sm" sx={{ color: "grey" }}>
              Username
            </Typography>
            <TextInput onChange={setUserName} value={userName} />
            <Button
              onClick={onSignUp}
              sx={{ color: "white", borderRadius: "100px" }}
            >
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </Stack>
    );

  return <Profile />;
};
