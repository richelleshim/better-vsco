import { Close } from "@mui/icons-material";
import { Post, PostSchema, deletePost } from "./api";
import { Stack, Button } from "@mui/joy";
import { FullPostDisplay } from "./FullPostDisplay";
import { useState } from "react";

type PostDisplayProps = {
  post: Post;
};

export const PostDisplay = ({ post,  }: PostDisplayProps) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  if (selectedPost !== null) return <FullPostDisplay post={post} />;
  return (
    <Stack spacing={-4} alignItems="flex-end">
      <Button
        sx={{ width: "0px", height: "10px" }}
        variant="clear"
        color="danger"
        size="sm"
        onClick={() => {
          deletePost(post.id);
        }}
      >
        <Close color="danger" />
      </Button>
      <img
        src={post.image}
        width="200px"
        onClick={() => {
          setSelectedPost(post);
        }}
      />
    </Stack>
  );
};
