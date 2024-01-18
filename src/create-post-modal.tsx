import {
  Button,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import { TextInput } from "./components/text-input";
import { LabeledGroup } from "./components/labeled-group";
import { uploadPostImage } from "./api/storage";
import { createPost } from "./api/post";
import { UploadImageInput } from "./components/upload-image-input";
import { User } from "./api/user";

type CreatePostModalProps = {
  user: User;
  open: boolean;
  onClose: () => void;
};

export const CreatePostModal = ({
  user,
  open,
  onClose,
}: CreatePostModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");

  const onCreate = async () => {
    if (file === null) return;
    const imageURL = await uploadPostImage(file);
    await createPost({
      caption,
      image: imageURL,
      hashtags: [],
      userEmail: user.email,
    });
    onClose();
  };

  const isValidInput = file !== null;

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ width: "500px" }}>
        <ModalClose />
        <Stack spacing={2}>
          <Typography>Create Post</Typography>
          <UploadImageInput onFileChange={setFile} />
          <Stack alignItems="center">
            {file && <img width="300px" src={URL.createObjectURL(file)} />}
          </Stack>
          <LabeledGroup title="Caption">
            <TextInput value={caption} onChange={setCaption} />
          </LabeledGroup>
          <Button onClick={onCreate} disabled={!isValidInput}>
            Create post
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};
