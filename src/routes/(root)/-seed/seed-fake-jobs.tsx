import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'
import Button from '~/components/Button'
import Icon from '~/components/Icon'
import { fetcher } from '~/utils/fetcher'

function SeedFakeJobs() {
  const seedFakeJobs = useMutation({
    mutationFn: () => fetcher('/seed-fake-jobs', { method: 'POST' }),
    onSuccess() {
      toast.success('100 jobs added successfully.')
    },
    onError(err) {
      toast.error(err?.message ?? 'Something went wrong...')
    },
  })
  return (
    <Button
      fullWidth
      variant="shadow"
      onPress={() => {
        seedFakeJobs.mutate()
      }}
      isLoading={seedFakeJobs.isPending}
      isDisabled={seedFakeJobs.isPending}
    >
      Seed 100 fake jobs
      <Icon name="database" />
    </Button>
  )
}

export default SeedFakeJobs
