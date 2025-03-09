import React from 'react'
import { Drawer as NativeDrawer, type DialogProps } from 'vaul'

type RenderTriggererArgs = {
  isOpened: boolean
  open: () => void
}

type DrawerProps = {
  children: React.ReactNode
  renderTriggerer: (_: RenderTriggererArgs) => React.ReactNode
}

function Drawer({
  children,
  renderTriggerer,
  ...dialogueProps
}: DrawerProps & DialogProps) {
  const [isOpened, setIsOpened] = React.useState(false)

  const open = () => {
    setIsOpened((s) => !s)
  }

  return (
    <NativeDrawer.Root
      shouldScaleBackground
      noBodyStyles
      open={isOpened}
      onOpenChange={setIsOpened}
      {...(dialogueProps ?? {})}
    >
      <NativeDrawer.Trigger>
        {renderTriggerer?.({ isOpened, open })}
      </NativeDrawer.Trigger>
      <NativeDrawer.Portal container={document.getElementById('vaul-portal')}>
        <NativeDrawer.Overlay className="fixed inset-0 bg-black/40" />
        <NativeDrawer.Content className="bg-zinc-200 dark:bg-zinc-900 flex flex-col rounded-t-[1.5rem] mt-24 fixed bottom-0 left-0 right-0">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-black1 my-2" />
          {children}
        </NativeDrawer.Content>
      </NativeDrawer.Portal>
    </NativeDrawer.Root>
  )
}

export default Drawer
