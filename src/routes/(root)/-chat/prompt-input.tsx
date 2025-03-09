'use client'

import {
  Button,
  Textarea,
  Tooltip,
  cn,
  type TextAreaProps,
} from '@heroui/react'
import React from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import Icon from '~/components/Icon'
import { fetcher } from '~/utils/fetcher'

export default function Component() {
  const queryClient = useQueryClient()
  const [prompt, setPrompt] = React.useState<string>('')

  const newMessage = useMutation({
    mutationFn: (body: { message: string }) =>
      fetcher('/messages', { method: 'POST', body: JSON.stringify(body) }),
    onSuccess() {
      setPrompt('')
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
    onError(err) {
      toast.error(err?.message ?? 'Something went wrong...')
    },
  })

  const handleSubmit = (evt?: React.FormEvent<HTMLFormElement>) => {
    evt?.preventDefault?.()
    newMessage.mutate({ message: prompt })
  }

  return (
    <div className="flex w-full flex-col gap-4 max-w-[65rem] mx-auto px-5">
      <form
        className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70"
        onSubmit={handleSubmit}
      >
        <PromptInput
          disabled={newMessage.isPending}
          classNames={{
            inputWrapper: 'shadow-none',
            innerWrapper: 'relative',
            input: 'pt-1 pl-2 pb-6 !pr-10 text-medium',
          }}
          endContent={
            <div className="flex items-end gap-2">
              <Tooltip showArrow content="Send message">
                <Button
                  isIconOnly
                  color={!prompt ? 'default' : 'primary'}
                  isDisabled={!prompt || newMessage.isPending}
                  radius="lg"
                  size="sm"
                  variant="solid"
                  type="submit"
                  isLoading={newMessage.isPending}
                >
                  <Icon name="arrow" />
                </Button>
              </Tooltip>
            </div>
          }
          minRows={3}
          radius="lg"
          value={prompt}
          variant="flat"
          onValueChange={setPrompt}
          handleFormSubmit={handleSubmit}
        />
      </form>
    </div>
  )
}

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
