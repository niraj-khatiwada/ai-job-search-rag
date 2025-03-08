'use client'

import { Avatar, Badge, cn } from '@heroui/react'
import React from 'react'

export type MessageCardProps = React.HTMLAttributes<HTMLDivElement> & {
  avatar?: string
  avatarPosition?: 'left' | 'right'
  showFeedback?: boolean
  message?: React.ReactNode
  currentAttempt?: number
  status?: 'success' | 'failed'
  attempts?: number
  messageClassName?: string
  onAttemptChange?: (attempt: number) => void
  onMessageCopy?: (content: string | string[]) => void
  onFeedback?: (feedback: 'like' | 'dislike') => void
  onAttemptFeedback?: (feedback: 'like' | 'dislike' | 'same') => void
}

const MessageCard = React.forwardRef<HTMLDivElement, MessageCardProps>(
  (
    {
      avatar,
      avatarPosition = 'left',
      message,
      showFeedback,
      status,
      onMessageCopy,
      onAttemptChange,
      onFeedback,
      onAttemptFeedback,
      className,
      messageClassName,
      ...props
    },
    ref,
  ) => {
    const messageRef = React.useRef<HTMLDivElement>(null)

    const failedMessageClassName =
      status === 'failed'
        ? 'bg-danger-100/50 border border-danger-100 text-foreground'
        : ''
    const failedMessage = <p>Something went wrong...</p>

    const hasFailed = status === 'failed'

    return (
      <div {...props} ref={ref} className={cn('flex gap-3', className)}>
        {avatarPosition === 'left' ? (
          <div className="relative flex-none">
            <Badge
              isOneChar
              color="danger"
              isInvisible={!hasFailed}
              placement="bottom-right"
              shape="circle"
            >
              <Avatar src={avatar} />
            </Badge>
          </div>
        ) : null}
        <div className="flex w-full flex-col gap-4">
          <div
            className={cn(
              'relative w-full rounded-medium bg-content2 px-4 py-3 text-default-600',
              failedMessageClassName,
              messageClassName,
            )}
          >
            <div ref={messageRef} className="pr-20 text-small">
              {hasFailed ? failedMessage : message}
            </div>
          </div>
        </div>
        {avatarPosition === 'right' ? (
          <div className="relative flex-none">
            <Badge
              isOneChar
              color="danger"
              isInvisible={!hasFailed}
              placement="bottom-right"
              shape="circle"
            >
              <Avatar src={avatar} />
            </Badge>
          </div>
        ) : null}
      </div>
    )
  },
)

export default MessageCard

MessageCard.displayName = 'MessageCard'
