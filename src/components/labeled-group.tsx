import { FormLabel, Stack } from "@mui/joy"
import { ReactNode } from "react"

export const LabeledGroup = ({
  title,
  titleExtra,
  children,
  caption,
}: {
  title: string
  titleExtra?: ReactNode
  children?: ReactNode
  caption?: ReactNode
}) => {
  return (
    <Stack spacing={1.5}>
      <Stack spacing={0.5}>
        <Stack direction="row" spacing={1}>
          <FormLabel>{title}</FormLabel>
          {titleExtra}
        </Stack>
        {caption}
      </Stack>

      {children}
    </Stack>
  )
}
