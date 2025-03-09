import {
  Textarea as NextUITextarea,
  type TextAreaProps as NextUITextareaProps,
} from '@heroui/react'

interface TextareaProps extends NextUITextareaProps {
  children: React.ReactNode
}

function Textarea({ children, ...props }: TextareaProps) {
  return <NextUITextarea {...(props ?? {})}>{children}</NextUITextarea>
}

export default Textarea
