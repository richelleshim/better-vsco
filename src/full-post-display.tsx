import {
  Box,
  Button,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/joy";
import { Post, deletePost } from "./api/post";
import {
  ArrowBackRounded,
  ArrowForwardRounded,
  Close,
  DeleteForever,
  EditRounded,
  MoreHoriz,
} from "@mui/icons-material";
import { format } from "date-fns";

type FullPostDisplayProps = {
  post: Post;
  onClose: () => void;
  onNext: (() => void) | null;
  onPrev: (() => void) | null;
};

export const FullPostDisplay = ({
  post,
  onClose,
  onNext,
  onPrev,
}: FullPostDisplayProps) => {
  return (
    <Box
      sx={{
        zIndex: 1,
        position: "absolute",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        backgroundColor: "white",
      }}
    >
      <Box position="absolute" top="25px" left="25px">
        <IconButton size="lg" onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Stack alignItems="center">
        <Stack width="60%" maxWidth="500px" height="100vh">
          <Stack flexGrow={1} justifyContent="center">
            <img src={post.image} />
          </Stack>
          <Stack spacing={1} py={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>richelleshim</Typography>
              <Stack direction="row">
                <Box visibility={onPrev ? undefined : "hidden"}>
                  <IconButton onClick={onPrev ?? undefined}>
                    <ArrowBackRounded />
                  </IconButton>
                </Box>
                <Box visibility={onNext ? undefined : "hidden"}>
                  <IconButton onClick={onNext ?? undefined}>
                    <ArrowForwardRounded />
                  </IconButton>
                </Box>
              </Stack>
            </Stack>
            <Stack alignItems="start">
              <Button size="sm" sx={{ borderRadius: "100px" }}>
                <Typography level="body-xs" sx={{ color: "white" }}>
                  Follow
                </Typography>
              </Button>
            </Stack>
            <Typography level="body-sm">{post.caption}</Typography>
            <Typography color="neutral" level="body-xs">
              {format(post.created, "LLLL d, yyyy p")}
            </Typography>
            <Stack alignItems="end">
              <Dropdown>
                <MenuButton variant="plain">
                  <MoreHoriz />
                </MenuButton>
                <Menu>
                  <MenuItem>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography sx={{ fontSize: "10px" }}>
                        <EditRounded />
                      </Typography>
                      <Typography level="body-xs">Edit</Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography sx={{ fontSize: "10px" }}>
                        <DeleteForever />
                      </Typography>
                      <Typography level="body-xs">Delete</Typography>
                    </Stack>
                  </MenuItem>
                </Menu>
              </Dropdown>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
