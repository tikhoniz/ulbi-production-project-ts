import {
  type JSXElementConstructor,
  type ReactElement,
  type SVGProps
} from 'react'

export interface SidebarItemType {
  path: string
  text: string
  Icon: (
    props: SVGProps<SVGElement>
  ) => ReactElement<any, string | JSXElementConstructor<any>>
  authOnly?: boolean
}
