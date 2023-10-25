import { LoginModal } from 'features/AuthByUsername'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import {
  useAppDispatch,
  useAppSelector
} from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
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
        <Button
          onClick={onLogout}
          className={classNames(cls.open, {}, [className])}
          theme={ButtonTheme.CLEAR_INVERTED}
        >
          {t('logout')}
        </Button>
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
