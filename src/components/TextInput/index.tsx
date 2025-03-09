import {
  Input as NextUIInput,
  type InputProps as NextUIInputProps,
} from '@heroui/react'

interface TextInputProps extends NextUIInputProps {}

function TextInput({ ...props }: TextInputProps) {
  return <NextUIInput size="sm" {...(props ?? {})} />
}

export default TextInput
