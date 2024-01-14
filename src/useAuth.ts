import { useEffect, useState } from "react";
import { firebaseAuth } from "./global";
import { User as FirebaseUser } from "firebase/auth";
import { User, getUser } from "./api";

type AuthState = {
  firebaseUser: FirebaseUser | null;
  user: User | null;
};

const initialAuthState: AuthState = {
  firebaseUser: null,
  user: null,
};

//keep up updated whether or not auth or not
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  const updateAuthState = async (firebaseUser: FirebaseUser | null) => {
    const user =
      firebaseUser?.email == null ? null : await getUser(firebaseUser.email);
    setAuthState({ firebaseUser, user });
  };

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged(updateAuthState);
  }, []);

  const refetch = () => {
    updateAuthState(authState.firebaseUser);
  };

  return { authState , refetch};
};
