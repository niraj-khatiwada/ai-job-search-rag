'use client'

import { ScrollShadow, cn } from '@heroui/react'
import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils/fetcher'
import Conversation from './conversation'
import PromptInput from './prompt-input'

export default function Chat({
  className,
  scrollShadowClassname,
}: {
  className?: string
  scrollShadowClassname?: string
}) {
  const { data: messages } = useQuery<
    { type: 'human' | 'ai'; data: { content: string } }[]
  >({
    queryKey: ['messages'],
    queryFn: () => fetcher('/messages'),
  })
  return (
    <div
      className={cn(
        'relative flex h-full w-full max-w-full flex-col gap-8',
        className,
      )}
    >
      <ScrollShadow
        className={cn('flex h-full flex-col', scrollShadowClassname)}
      >
        <Conversation
          messages={
            messages?.map((message) => ({
              role: message.type,
              message: message.data?.content ?? '',
            })) ?? []
          }
        />
      </ScrollShadow>
      <div className="flex flex-col gap-2 fixed bottom-[1rem] left-0 right-0">
        <PromptInput />
      </div>
    </div>
  )
}
