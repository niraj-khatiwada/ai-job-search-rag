import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import * as React from 'react'

import { Toaster } from '~/components/Toast'
import QueryClientProvider from '~/providers/QueryClientProvider'
import UIProvider from '../providers/UIProvider'

export const Route = createRootRoute({
  component: RootComponent,
})

const isDev = import.meta.env.DEV

function RootComponent() {
  return (
    <>
      <QueryClientProvider>
        <UIProvider>
          <Outlet />
        </UIProvider>
        <Toaster />
      </QueryClientProvider>
      {isDev ? <TanStackRouterDevtools position="bottom-right" /> : null}
    </>
  )
}
