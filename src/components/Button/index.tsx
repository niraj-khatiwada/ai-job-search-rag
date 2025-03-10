import {
  Button as NextButton,
  type ButtonProps as NextButtonProps,
  cn,
} from '@heroui/react'
import React from 'react'

export interface ButtonProps extends NextButtonProps {
  color?: NextButtonProps['color']
  variant?: NextButtonProps['variant']
}

const Button = React.forwardRef(
  (props: ButtonProps, ref: NextButtonProps['ref']) => {
    const { color, variant, ...nextButtonProps } = props

    return (
      <NextButton
        ref={ref}
        disableRipple
        color={color ?? 'default'}
        variant={variant ?? 'flat'}
        {...nextButtonProps}
        className={cn(['font-medium', nextButtonProps.className])}
      />
    )
  },
)
Button.displayName = 'Button'

export default Button
