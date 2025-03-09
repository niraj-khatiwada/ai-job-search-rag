import {
  Form as NextUIForm,
  type FormProps as NextUIFormProps,
  cn,
} from '@heroui/react'

interface FormProps extends NextUIFormProps {
  children: React.ReactNode
}

function Form({ children, className, ...props }: FormProps) {
  return (
    <NextUIForm className={cn('px-10 py-8', className)} {...(props ?? {})}>
      {children}
    </NextUIForm>
  )
}

export default Form
