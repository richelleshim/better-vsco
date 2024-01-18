import { ArrowBackRounded } from "@mui/icons-material"
import { Box, Typography, Stack, Button } from "@mui/joy"
import { signOut } from "firebase/auth"
import { TextInput } from "./components/text-input"
import { UploadImageInput } from "./components/upload-image-input"
import { firebaseAuth } from "./global"
import { useState } from "react"

export const SignUpDisplay = ({
  onSignUp,
}: {
  onSignUp: (username: string, profilePictureURL: File | null) => void
}) => {
  const [userName, setUserName] = useState("")
  const [file, setFile] = useState<File | null>(null)

  return (
    <Stack direction="row" position="absolute">
      <Stack
        height="100vh"
        width="30vw"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ backgroundColor: "black" }}
      >
        <div
          onClick={() => {
            signOut(firebaseAuth)
          }}
        >
          <Box
            sx={{
              ":hover": {
                cursor: "pointer",
              },
            }}
            ml={2}
          >
            <Stack direction="row" spacing={0.5}>
              <ArrowBackRounded sx={{ color: "white" }} />
              <Typography
                sx={{
                  color: "white",
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Back
              </Typography>
            </Stack>
          </Box>
        </div>
      </Stack>
      <Stack width="10vw" />
      <Stack height="100vh" alignItems="center" justifyContent="center">
        <Stack spacing={3} width="300px">
          <Typography level="h3" sx={{ color: "black" }}>
            Complete Sign Up
          </Typography>
          <Stack spacing={2}>
            <Typography level="body-sm" sx={{ color: "grey" }}>
              Username
            </Typography>
            <TextInput onChange={setUserName} value={userName} />
            <Typography level="body-sm" sx={{ color: "grey" }}>
              Profile Picture
            </Typography>
            <UploadImageInput onFileChange={setFile} />
            {file && <img src={URL.createObjectURL(file)} />}
            <Button
              onClick={() => {
                onSignUp(userName, file)
              }}
              sx={{ color: "white", borderRadius: "100px" }}
            >
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
