import type { ReactNode, JSX } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  // то что телепортируется
  children: ReactNode
  // куда телепортируем
  element?: HTMLElement
}

export const Portal = (props: PortalProps): JSX.Element => {
  const { children, element = document.body } = props

  return createPortal(children, element)
}
