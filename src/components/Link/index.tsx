import { Link as NextLink, LinkProps as NextLinkProps } from '@heroui/react'
import React from 'react'

interface LinkProps {}

function Link(props: LinkProps & NextLinkProps) {
  const { ...nextLinkProps } = props
  return <NextLink {...nextLinkProps} />
}

export default Link
