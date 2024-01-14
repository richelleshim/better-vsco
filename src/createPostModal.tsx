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
import { createPost, uploadPostImage } from "./api";

type CreatePostModalProps = {
  open: boolean;
  onClose: () => void;
};

export const CreatePostModal = ({ open, onClose }: CreatePostModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");

  const onCreate = async () => {
    if (file === null) return;
    const imageURL = await uploadPostImage(file);
    await createPost({
      caption,
      image: imageURL,
      hashtags: [],
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
          <Button component="label">
            Upload Image
            <input
              type="file"
              hidden
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file === undefined) return;
                setFile(file);
              }}
            />
          </Button>
          {file && <img src={URL.createObjectURL(file)} />}
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
