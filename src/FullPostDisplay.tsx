import { Stack, Typography } from "@mui/joy";
import { Post, PostSchema } from "./api";
import { format } from "date-fns";

type PostDisplayProps = {
  post: Post;

};

export const FullPostDisplay = ({ post }: PostDisplayProps) => {
  return (
    <Stack spacing={1}>
      <img src={post.image} width="400px" />
      <Typography level="h3">{post.caption}</Typography>
      {/* <Stack direction="row" spacing={0.5}>
        {note.tags.map((tag, tagIndex) => {
          return <TagChip key={tagIndex} tag={tag} />;
        })}
      </Stack> */}
    </Stack>
  );
};

