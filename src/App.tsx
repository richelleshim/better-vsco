import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "./useAuth";
import { Button, Stack } from "@mui/joy";
import { TextInput } from "./components/text-input";
import { useState } from "react";
import { createUser } from "./api";
import { firebaseAuth } from "./global";
import { Profile } from "./Profile";

const googleProvider = new GoogleAuthProvider();

export const App = () => {
  const result = useAuth();
  const { authState, refetch } = result;
  const { firebaseUser, user } = authState;
  const [userName, setUserName] = useState("");

  const onLogInGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider);
  };

  if (firebaseUser?.email == null)
    return (
      <Stack>
        <Button onClick={onLogInGoogle}>Log In</Button>
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
      <Stack>
        <TextInput onChange={setUserName} value={userName} />
        <Button onClick={onSignUp}>Sign Up</Button>
      </Stack>
    );

  return <Profile />;
};
