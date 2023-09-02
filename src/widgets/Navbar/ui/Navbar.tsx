import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps): JSX.Element => {
  const { t } = useTranslation()
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.liks}></div>

      <Button
        className={classNames('', {}, [className])}
        theme={ButtonTheme.CLEAR}>
        {t('lang')}
      </Button>
    </div>
  )
}
