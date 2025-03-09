import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import Navbar from '~/components/Navbar'
import Chat from './-chat'
import SeedData from './-seed'

export const Route = createFileRoute('/(root)/')({
  component: Root,
})

function Root() {
  return (
    <>
      <Navbar endContent={<SeedData />} />
      <div className="max-w-lg mx-auto">
        <Chat />
      </div>
    </>
  )
}

export default Root
