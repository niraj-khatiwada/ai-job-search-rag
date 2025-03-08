import type { TextAreaProps } from '@heroui/react'
import { Textarea, cn } from '@heroui/react'
import React from 'react'

const PromptInput = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaProps & { handleFormSubmit: () => void }
>(({ classNames = {}, ...props }, ref) => {
  const handleKeyDown = (
    evt: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent,
  ) => {
    if (evt.key === 'Enter' && !evt.shiftKey) {
      evt.preventDefault()
      props?.handleFormSubmit?.()
    }
  }
  return (
    <Textarea
      ref={ref}
      aria-label="Prompt"
      className="min-h-[40px]"
      classNames={{
        ...classNames,
        label: cn('hidden', classNames?.label),
        input: cn('py-0', classNames?.input),
      }}
      minRows={1}
      placeholder="Enter a prompt here"
      radius="lg"
      variant="flat"
      onKeyDown={handleKeyDown}
      {...props}
    />
  )
})

PromptInput.displayName = 'PromptInput'

export default PromptInput
