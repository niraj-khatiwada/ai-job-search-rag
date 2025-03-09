import {
  Select as NextUISelect,
  SelectItem as NextUISelectItem,
  type SelectItemProps as NextUISelectItemProps,
  type SelectProps as NextUISelectProps,
  cn,
} from '@heroui/react'
import React from 'react'
import { blurCSS } from '~/ui/BackdropBlur'

interface SelectProps extends NextUISelectProps {}

function Select(props: SelectProps) {
  return (
    <NextUISelect
      radius="lg"
      {...props}
      classNames={{
        popoverContent: cn([blurCSS, props?.classNames?.popoverContent ?? '']),
        ...(props?.classNames ?? {}),
      }}
    />
  )
}

interface SelectItemProps extends NextUISelectItemProps {}
export function SelectItem(props: SelectItemProps) {
  return <NextUISelectItem {...props} />
}

export default Select
