import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'
import ButtonWithConfirmation, {
  ButtonWithConfirmationProps,
} from '~/components/Button/button-with-confirmation'
import Icon from '~/components/Icon'
import { fetcher } from '~/utils/fetcher'

function DeleteAllJobs() {
  const deleteAllJobs = useMutation({
    mutationFn: () => fetcher('/jobs', { method: 'DELETE' }),
    onSuccess() {
      toast.success('All jobs deleted successfully.')
    },
    onError(err) {
      toast.error(err?.message ?? 'Something went wrong...')
    },
  })

  const handleDelete: ButtonWithConfirmationProps['onPress'] = async (
    _,
    resetConfirmation,
  ) => {
    await deleteAllJobs.mutateAsync()
    resetConfirmation()
  }
  return (
    <ButtonWithConfirmation
      fullWidth
      onPress={handleDelete}
      isLoading={deleteAllJobs.isPending}
      isDisabled={deleteAllJobs.isPending}
      color="danger"
      isConfirmingProps={{
        isIconOnly: false,
        variant: 'solid',
      }}
    >
      {({ isConfirming }) => (
        <>
          <span>{isConfirming ? 'Confirm Deletion' : 'Delete All Jobs'}</span>
          <Icon name="bin" />
        </>
      )}
    </ButtonWithConfirmation>
  )
}

export default DeleteAllJobs
