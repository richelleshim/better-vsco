import { useEffect, useState } from "react"
import { firebaseAuth } from "./global"
import { User as FirebaseUser } from "firebase/auth"
import { User, getUser } from "./api/user"

type AuthState = {
  firebaseUser: FirebaseUser | null
  user: User | null
}

const initialAuthState: AuthState = {
  firebaseUser: null,
  user: null,
}

//keep up updated whether or not auth or not
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState)
  const [ready, setReady] = useState(false)

  const updateAuthState = async (firebaseUser: FirebaseUser | null) => {
    const user = firebaseUser?.email == null ? null : await getUser(firebaseUser.email)
    setAuthState({ firebaseUser, user })
    setReady(true)
  }

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged(updateAuthState)
  }, [])

  const refetch = () => {
    updateAuthState(authState.firebaseUser)
  }

  return { authState, refetch, ready }
}
