import { InputProps, Input as JoyInput } from "@mui/joy"

type Prop = {
  onChange: (value: string) => void
} & Omit<InputProps, "onChange">

export const TextInput = ({ onChange, ...rest }: Prop) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return <JoyInput onChange={handleChange} {...rest} />
}
