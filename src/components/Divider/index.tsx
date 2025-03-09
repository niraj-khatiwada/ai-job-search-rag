import {
  Divider as NextUIDivider,
  type DividerProps as NextUIDividerProps,
  cn,
} from '@heroui/react'
import React from 'react'

interface DividerProps extends NextUIDividerProps {}

function Divider(props: DividerProps) {
  return (
    <NextUIDivider
      {...props}
      className={cn(['bg-zinc-200 dark:bg-zinc-800', props?.className ?? ''])}
    />
  )
}

export default Divider
