import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Modal } from 'shared/ui/Modal/Modal'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps): JSX.Element => {
  const { t } = useTranslation()
  const [isAuthModal, setAuthModal] = useState(false)

  const onToggleModal = useCallback((): void => {
    setAuthModal(prev => !prev)
  }, [])

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button
        onClick={onToggleModal}
        className={classNames(cls.open, {}, [className])}
        theme={ButtonTheme.CLEAR_INVERTED}
      >
        {t('login')}
      </Button>
      <Modal
        isOpen={isAuthModal}
        onClose={onToggleModal}
        // eslint-disable-next-line i18next/no-literal-string
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum omnis excepturi consequuntur
        quasi laudantium dicta molestiae sequi? Corporis exercitationem aliquid, laborum
        perferendis, accusantium magni tempore doloremque officia provident eius odit.
      </Modal>
    </div>
  )
}
