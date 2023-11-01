import { type StateSchema } from 'app/providers/StoreProvider'
import { getUIScrollByPath, uiActions } from 'features/UI'
import {
  useRef,
  type MutableRefObject,
  type ReactNode,
  type UIEvent
} from 'react'
import { useLocation } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classnames'
import { useThrottle } from 'shared/lib/hooks/optimiseHooks/useThrottle'
import {
  useAppDispatch,
  useAppSelector
} from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import cls from './Page.module.scss'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}

export const Page = (props: PageProps): JSX.Element => {
  const { className, children, onScrollEnd } = props
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()

  const scrollPosition = useAppSelector((state: StateSchema) =>
    getUIScrollByPath(state, pathname)
  )

  console.log('scrollPosition', scrollPosition)

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd
  })

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  })

  const onScrollHandle = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      uiActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname
      })
    )
  }, 500)

  // console.log('wrapperRef', wrapperRef?.current?.scrollTop)

  return (
    <section
      ref={wrapperRef}
      className={classNames(cls.Page, {}, [className])}
      onScroll={onScrollHandle}
    >
      {children}
      {/* при появлении в области видимости этого дива будет срабатывать коллбэк в useInfiniteScroll */}
      {/* для того чтобы обзервер стабильно отлавливал див, добавляем ему высоту и отступ */}
      {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
    </section>
  )
}
