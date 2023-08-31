import { classNames } from 'shared/lib/classNames/classnames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps): JSX.Element => {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.liks}></div>
      <AppLink theme={AppLinkTheme.SECONDARY} to={'/'}>
        Main
      </AppLink>
      <AppLink theme={AppLinkTheme.SECONDARY} to={'/about'}>
        About
      </AppLink>
    </div>
  )
}
