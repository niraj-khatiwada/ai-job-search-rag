import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'
import ButtonWithConfirmation, {
  ButtonWithConfirmationProps,
} from '~/components/Button/button-with-confirmation'
import Icon from '~/components/Icon'
import Tooltip from '~/components/Tooltip'
import { fetcher } from '~/utils/fetcher'

function DeleteHistory() {
  const queryClient = useQueryClient()

  const deleteChatHistory = useMutation({
    mutationFn: () => fetcher('/chat-history', { method: 'DELETE' }),
    onSuccess() {
      toast.success('Chat history deleted successfully.')
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    },
    onError(err) {
      toast.error(err?.message ?? 'Something went wrong...')
    },
  })

  const handleDelete: ButtonWithConfirmationProps['onPress'] = async (
    _,
    resetConfirmation,
  ) => {
    await deleteChatHistory.mutateAsync()
    resetConfirmation()
  }
  return (
    <ButtonWithConfirmation
      isIconOnly
      fullWidth
      onPress={handleDelete}
      isLoading={deleteChatHistory.isPending}
      isDisabled={deleteChatHistory.isPending}
      size="sm"
      isConfirmingProps={{
        isIconOnly: false,
        color: 'danger',
      }}
    >
      {({ isConfirming }) => (
        <>
          {isConfirming ? 'Delete History' : ''}
          <Tooltip content="Delete History">
            <Icon name="bin" />
          </Tooltip>
        </>
      )}
    </ButtonWithConfirmation>
  )
}

export default DeleteHistory
