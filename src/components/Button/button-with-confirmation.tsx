import { type ButtonProps as NextButtonProps, PressEvent } from '@heroui/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import Button, { ButtonProps } from '.'

export interface ButtonWithConfirmationProps
  extends Omit<ButtonProps, 'children' | 'onPress'> {
  children?: (_: {
    isConfirming: boolean
    resetConfirmation: () => void
  }) => React.ReactNode
  isConfirmingProps?: NextButtonProps
  onPress?: (evt: PressEvent, resetConfirmation: () => void) => void
}

const ButtonWithConfirmation = React.forwardRef(
  (props: ButtonWithConfirmationProps, ref: NextButtonProps['ref']) => {
    const { isConfirmingProps, children, ...buttonProps } = props

    const [isConfirming, setIsConfirming] = useState(false)

    const containerRef = useRef<HTMLDivElement | null>(null)

    const resetConfirmation = () => {
      setIsConfirming(false)
    }

    const handlePress = (evt: PressEvent) => {
      if (!isConfirming) {
        setIsConfirming(true)
      } else {
        buttonProps?.onPress?.(evt, resetConfirmation)
      }
    }

    useEffect(() => {
      const handleClickOnConfirmation = (evt: MouseEvent | FocusEvent) => {
        if (
          containerRef.current &&
          !containerRef.current?.contains(evt.target as Node)
        ) {
          setIsConfirming(false)
        }
      }
      if (isConfirming && containerRef.current) {
        window.addEventListener('click', handleClickOnConfirmation)
        window.addEventListener('focusin', handleClickOnConfirmation)
      } else {
        window.removeEventListener('click', handleClickOnConfirmation)
        window.removeEventListener('focusin', handleClickOnConfirmation)
      }
      return () => {
        window.removeEventListener('click', handleClickOnConfirmation)
        window.removeEventListener('focusin', handleClickOnConfirmation)
      }
    }, [isConfirming])

    return (
      <div ref={containerRef} className="flex items-center">
        <Button
          {...buttonProps}
          {...(isConfirming ? isConfirmingProps : {})}
          ref={ref as LegacyRef<HTMLButtonElement>}
          onPress={handlePress}
        >
          <AnimatePresence initial={false}>
            <motion.div
              className="flex items-center"
              layout="preserve-aspect"
              transition={{
                type: 'spring',
                visualDuration: 0.2,
                bounce: 0.15,
              }}
            >
              {children?.({ isConfirming, resetConfirmation })}
            </motion.div>
          </AnimatePresence>
        </Button>
      </div>
    )
  },
)
ButtonWithConfirmation.displayName = 'ButtonWithConfirmation'

export default ButtonWithConfirmation
