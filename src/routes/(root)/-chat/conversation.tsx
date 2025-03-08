import React from 'react'

import MessageCard from './message-card'

type ConversationProps = {
  messages?: { role: 'human' | 'ai'; message: string }[]
}

export default function Conversation({ messages = [] }: ConversationProps) {
  return (
    <div className="flex flex-col gap-4 px-1 pb-[200px]">
      {messages.map(({ role, message }, index) => (
        <MessageCard
          key={index}
          attempts={index === 1 ? 2 : 1}
          currentAttempt={index === 1 ? 2 : 1}
          message={message}
          messageClassName={
            role === 'human'
              ? 'max-w-sm bg-zinc-300 dark:bg-zinc-800 ml-auto'
              : 'max-w-md bg-slate-300 dark:bg-slate-900'
          }
          avatarPosition={role === 'human' ? 'right' : 'left'}
        />
      ))}
    </div>
  )
}
