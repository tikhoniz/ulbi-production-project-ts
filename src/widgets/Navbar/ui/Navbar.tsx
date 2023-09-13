import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider/config/store'
import { LoginModal } from 'features/AuthByUsername'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { userActions } from '../../../entities/User'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps): JSX.Element => {
  const { t } = useTranslation()
  const [isAuthModal, setAuthModal] = useState(false)
  const { authData } = useAppSelector(state => state.userReducer)
  const dispatch = useAppDispatch()

  const onCloseModal = useCallback((): void => {
    setAuthModal(false)
  }, [])

  const onOpenModal = useCallback((): void => {
    setAuthModal(true)
  }, [])

  const onLogout = useCallback((): void => {
    dispatch(userActions.logout())
    setAuthModal(false)
  }, [dispatch])

  if (authData) {
    return (
      <div className={classNames(cls.Navbar, {}, [className])}>
        <Button
          onClick={onLogout}
          className={classNames(cls.open, {}, [className])}
          theme={ButtonTheme.CLEAR_INVERTED}
        >
          {t('logout')}
        </Button>
      </div>
    )
  }

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button
        onClick={onOpenModal}
        className={classNames(cls.open, {}, [className])}
        theme={ButtonTheme.CLEAR_INVERTED}
      >
        {t('login')}
      </Button>
      <LoginModal
        isOpen={isAuthModal}
        onClose={onCloseModal}
      />
    </div>
  )
}
