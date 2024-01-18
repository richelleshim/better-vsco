import { Button, Typography } from "@mui/joy"

export const UploadImageInput = ({
  onFileChange,
}: {
  onFileChange: (file: File | null) => void
}) => {
  return (
    <Button component="label" sx={{ color: "DarkGray" }}>
      <Typography sx={{ color: "white" }}>Upload Image</Typography>
      <input
        type="file"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file === undefined) return
          onFileChange(file)
        }}
      />
    </Button>
  )
}
