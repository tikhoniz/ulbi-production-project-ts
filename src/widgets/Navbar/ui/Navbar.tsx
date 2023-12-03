import { LoginModal } from 'features/AuthByUsername'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RoutePath } from 'shared/config/routeConfig/routePath'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  useAppDispatch,
  useAppSelector
} from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Dropdown } from 'shared/ui/Dropdown/Dropdown'
import { userActions } from '../../../entities/User'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps): JSX.Element => {
  const { t } = useTranslation()
  const [isAuthModal, setAuthModal] = useState(false)
  const { authData } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const onCloseModal = useCallback((): void => {
    setAuthModal(false)
  }, [])

  const onOpenModal = useCallback((): void => {
    setAuthModal(true)
  }, [])

  const onLogout = useCallback((): void => {
    dispatch(userActions.logout())
  }, [dispatch])

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <AppLink
          to={RoutePath.article_create}
          theme={AppLinkTheme.SECONDARY}
          className={cls.createBtn}
        >
          {t('Создать статью')}
        </AppLink>
        {/* <Button
          onClick={onLogout}
          className={classNames(cls.open, {}, [className])}
          theme={ButtonTheme.CLEAR_INVERTED}
        >
          {t('logout')}
        </Button> */}

        <Dropdown
          direction='bottom left'
          className={cls.dropdown}
          items={[
            {
              content: t('Профиль'),
              href: RoutePath.profile + authData.id
            },
            {
              content: t('Выйти'),
              onClick: onLogout
            }
          ]}
          trigger={<Avatar size={30} src={authData.avatar} />}
        />
      </header>
    )
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button
        onClick={onOpenModal}
        className={classNames(cls.open, {}, [className])}
        theme={ButtonTheme.CLEAR_INVERTED}
      >
        {t('login')}
      </Button>
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  )
})
