import { Button, Modal, ModalClose, ModalDialog, Stack, Typography } from "@mui/joy"
import { useState } from "react"
import { uploadPostImage } from "./api/storage"
import { UploadImageInput } from "./components/upload-image-input"
import { UpdateUserInput, User, updateUser } from "./api/user"
import { TextInput } from "./components/text-input"
import { LabeledGroup } from "./components/labeled-group"

type EditProfilePictureModalProp = {
  user: User
  open: boolean
  onClose: () => void
}

export const EditProfilePictureModal = ({ user, open, onClose }: EditProfilePictureModalProp) => {
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [about, setAbout] = useState("")

  const onSave = async () => {
    if (profilePicture === null) return
    const imageURL = await uploadPostImage(profilePicture)
    const input: UpdateUserInput = {
      about: about === "" ? null : about,
      profilePictureURL: imageURL,
      email: user.email,
    }
    await updateUser(input)

    onClose()
  }

  const isValidInput = profilePicture !== null

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ width: "500px" }}>
        <ModalClose />
        <Stack spacing={2}>
          <Typography>Update Profile Picture</Typography>
          <UploadImageInput onFileChange={setProfilePicture} />
          {profilePicture && <img src={URL.createObjectURL(profilePicture)} />}
          <LabeledGroup title="About">
            <TextInput value={about} onChange={setAbout} />
          </LabeledGroup>
          <Button onClick={onSave} disabled={!isValidInput}>
            Update Profile
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
