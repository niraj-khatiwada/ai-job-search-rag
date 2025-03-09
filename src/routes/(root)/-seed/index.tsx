import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'

import { Divider } from '@heroui/react'
import Button from '~/components/Button'
import Drawer from '~/components/Drawer'
import Form from '~/components/Form'
import Icon from '~/components/Icon'
import NumberInput from '~/components/NumberInput'
import TextInput from '~/components/TextInput'
import Tooltip from '~/components/Tooltip'
import { fetcher } from '~/utils/fetcher'
import DeleteAllJobs from './delete-all-jobs'
import SeedFakeJobs from './seed-fake-jobs'

type Job = {
  title: string
  company: string
  location: string
  salary: number
}

function SeedData() {
  const addNewJob = useMutation({
    mutationFn: (body: Job) =>
      fetcher('/job', { method: 'POST', body: JSON.stringify(body) }),
    onSuccess() {
      toast.success('New job added successfully.')
    },
    onError(err) {
      toast.error(err?.message ?? 'Something went wrong...')
    },
  })

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const currentTarget = evt.currentTarget
    const formData = Object.fromEntries(new FormData(currentTarget))
    await addNewJob.mutateAsync({
      title: formData.title as string,
      company: formData.company as string,
      location: formData.location as string,
      salary: formData.salary as unknown as number,
    })
    currentTarget.reset()
  }
  return (
    <Drawer
      renderTriggerer={({ open }) => (
        <Button isIconOnly size="sm" onPress={open}>
          <Tooltip content="Seed jobs" aria-label="Seed jobs">
            <Icon name="database" size={24} />
          </Tooltip>
        </Button>
      )}
    >
      <p className="text-2xl text-center mt-4">Add new job(s)</p>
      <div className="w-full h-[80vh] max-w-[35rem] mx-auto">
        <Form
          className="w-full justify-center items-center space-y-4"
          onSubmit={onSubmit}
        >
          <TextInput isRequired name="title" label="Job Title" />
          <TextInput isRequired name="company" label="Company" />
          <TextInput isRequired name="location" label="Location" />
          <NumberInput isRequired name="salary" label="Salary" />
          <Button
            color="primary"
            fullWidth
            type="submit"
            variant="solid"
            isLoading={addNewJob.isPending}
            disabled={addNewJob.isPending}
          >
            Submit
          </Button>
        </Form>
        <Divider />
        <div className="my-10">
          <SeedFakeJobs />
        </div>
        <Divider />
        <div className="my-10">
          <DeleteAllJobs />
        </div>
      </div>
    </Drawer>
  )
}

export default SeedData
