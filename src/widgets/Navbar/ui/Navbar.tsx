import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps): JSX.Element => {
  const { t } = useTranslation()
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.liks}></div>
      <AppLink theme={AppLinkTheme.SECONDARY} to={'/'}>
        {t('Main')}
      </AppLink>
      <AppLink theme={AppLinkTheme.SECONDARY} to={'/about'}>
        {t('About')}
      </AppLink>
      <Button
        className={classNames('', {}, [className])}
        theme={ThemeButton.CLEAR}
      >
        {t('lang')}
      </Button>
    </div>
  )
}
