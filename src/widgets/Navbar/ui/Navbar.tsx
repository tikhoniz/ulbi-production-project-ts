import { classNames } from 'shared/lib/classNames/classnames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import cls from './Navbar.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button/Button'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps): JSX.Element => {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.liks}></div>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <AppLink theme={AppLinkTheme.SECONDARY} to={'/'}>
        Main
      </AppLink>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <AppLink theme={AppLinkTheme.SECONDARY} to={'/about'}>
        About
      </AppLink>
      {/* eslint-disable-next-line i18next/no-literal-string */}
      {/* <Modal isOpen={true}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, magni!
        Quas, quaerat! Neque, ducimus, tempora, natus fuga earum aliquam
        incidunt cupiditate provident vel laboriosam quod placeat perferendis
        vero consequuntur expedita.
      </Modal> */}
    </div>
  )
}
