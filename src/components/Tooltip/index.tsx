import {
  Tooltip as NextUITooltip,
  type TooltipProps as NextUITooltipProps,
  cn,
} from '@heroui/react'
import React from 'react'
import { blurCSS, getBlurPseudoCSS } from '~/ui/BackdropBlur'

const blurCSSBefore = getBlurPseudoCSS('before')

interface TooltipProps extends NextUITooltipProps {}
function Tooltip(props: TooltipProps) {
  return (
    <NextUITooltip
      delay={1000}
      showArrow
      size="sm"
      {...props}
      className={cn(blurCSS, props?.className)}
      classNames={{
        base: cn([blurCSSBefore, props?.classNames?.arrow ?? '']),
        ...(props?.classNames ?? {}),
      }}
    >
      <span>{props?.children}</span>
    </NextUITooltip>
  )
}

export default Tooltip
