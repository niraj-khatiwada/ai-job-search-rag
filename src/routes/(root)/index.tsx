import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/(root)/')({
  component: Root,
})

function Root() {
  return <div className="max-w-xl mx-auto">Hello World</div>
}

export default Root
