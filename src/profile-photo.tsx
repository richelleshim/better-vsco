import { Box } from "@mui/joy";

export const ProfilePhoto = ({
  image,
  onClick,
}: {
  image: string;
  onClick: () => void;
}) => {
  return (
    // <Button
    // variant="richelle">
    <Box
      width="100px"
      height="100px"
      style={{
        borderRadius: "50%",
      }}
      sx={{
        ":hover": {
          cursor: "pointer",
        },
      }}
    >
      <img
        src={image}
        width="100px"
        height="100px"
        style={{
          borderRadius: "50%",
        }}
        onClick={onClick}
      />
    </Box>
    // </Button>
  );
};
