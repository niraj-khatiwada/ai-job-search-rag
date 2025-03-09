import React from 'react'
import ReactDOM from 'react-dom'
import { Toaster as NativeToaster, toast } from 'sonner'
import { useTheme } from '~/hooks/useTheme'

export function Toaster() {
  const { theme } = useTheme()
  return ReactDOM.createPortal(
    <NativeToaster
      position="bottom-center"
      richColors
      theme={theme}
      toastOptions={{
        classNames: {
          default: 'w-fit rounded-[3rem] px-4 py-2 flex align-center',
        },
        duration: 3000,
        style: { borderRadius: '3rem' },
      }}
      className="flex justify-center items-center"
    />,
    document.getElementById('portal')!,
  )
}

export { toast }
