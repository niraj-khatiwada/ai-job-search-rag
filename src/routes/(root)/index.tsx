import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import Navbar from '~/components/Navbar'
import Chat from './-chat'
import DeleteHistory from './-delete-history'
import SeedData from './-seed'

export const Route = createFileRoute('/(root)/')({
  component: Root,
})

function Root() {
  return (
    <>
      <Navbar
        endContent={
          <div className="flex items-center gap-2">
            <DeleteHistory />
            <SeedData />
          </div>
        }
      />
      <div className="max-w-lg mx-auto">
        <Chat />
      </div>
    </>
  )
}

export default Root
