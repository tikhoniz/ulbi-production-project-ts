import { type JSXElementConstructor, type ReactElement, type SVGProps } from 'react'
import HomeIcon from 'shared/assets/icons/home.svg'
import AboutIcon from 'shared/assets/icons/reader.svg'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

export interface SidebarItemType {
  path: string
  text: string
  Icon: (props: SVGProps<SVGElement>) => ReactElement<any, string | JSXElementConstructor<any>>
  authOnly?: boolean
}

export const SidebarItemList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    Icon: HomeIcon,
    text: 'Main'
  },
  {
    path: RoutePath.about,
    Icon: AboutIcon,
    text: 'About'
  },
  {
    path: RoutePath.profile,
    Icon: AboutIcon,
    text: 'Profile',
    authOnly: true
  }
]
