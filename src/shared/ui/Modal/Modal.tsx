import { useTheme } from 'app/providers/ThemeProvider'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classnames'
import { Portal } from '../Portal/Portal'
import cls from './Modal.module.scss'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  // добавляем флаг lazy для того, чтобы модальное окно не монтировалось в DOM дерево с самого начала, а только если оно открывается. Это позволяет уменьшить размер бандла
  lazy?: boolean
}

export const Modal = (props: ModalProps): JSX.Element => {
  const { className, children, isOpen, lazy, onClose } = props
  // состояние для закрытия модального окна
  const [isClosing, setIsClosing] = useState(false)
  // состояние вмонтировано ли модальное окно в DOM дерево
  const [isMounted, setIsMounted] = useState(false)
  // референс для хранения таймаута, чтобы его очищать
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const { theme } = useTheme()
  // задержка анимации
  const ANIMATION_DELAY = 300

  // устанавливает флаг когда вмонтировано модальное окно
  useEffect(() => {
    if (isOpen ?? false) {
      setIsMounted(true)
    }
  }, [isOpen])

  // останавливаем всплытие события и срабатывание клика при нажатии на модальное окно
  // теперь при нажатии на само модальное окно оно не закроется
  const closeHandler = useCallback((): void => {
    if (onClose != null) {
      setIsClosing(true)
      timerRef.current = setTimeout(() => {
        onClose()
        // сбрасывает состояние, чтобы стили вернулись в исходное состояние
        setIsClosing(false)
      }, ANIMATION_DELAY)
    }
  }, [onClose])

  // чтобы функции каждый раз при рендеренге не создавали новые ссылки, нужно обернуть их в useCallback
  // функция нажатия на кнопку esc
  const onKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    },
    [closeHandler]
  )

  const onContentClick = (e: React.MouseEvent): void => {
    e.stopPropagation()
  }

  useEffect(() => {
    if (isOpen ?? false) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      clearTimeout(timerRef.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
    [cls[theme]]: true
  }

  // если флаг isMounted в состоянии false, вернуть null
  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <div
          className={cls.overlay}
          onClick={closeHandler}
        >
          <div
            className={cls.content}
            onClick={onContentClick}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
