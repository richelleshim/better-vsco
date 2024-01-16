export const ProfilePhoto = ({ image }: { image: string }) => {
  return (
    <img
      src={image}
      width="100px"
      height="100px"
      style={{
        borderRadius: "50%",
      }}
    />
  );
};
