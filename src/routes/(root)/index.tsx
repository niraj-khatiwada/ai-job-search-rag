import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import Chat from './-chat'

export const Route = createFileRoute('/(root)/')({
  component: Root,
})

function Root() {
  return (
    <div className="max-w-lg mx-auto">
      <Chat />
    </div>
  )
}

export default Root
