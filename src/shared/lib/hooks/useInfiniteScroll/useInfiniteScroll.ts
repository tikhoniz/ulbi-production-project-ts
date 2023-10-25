import { useEffect, useRef, type MutableRefObject } from 'react'

export interface UseInfiniteScrollOptions {
  // должен вызваться когда пересечен тот или иной элемент
  callback?: () => void
  // элемент которы в случае его пересечения вызовится callback
  triggerRef: MutableRefObject<HTMLElement>
  // элемент внутри которого находится скролл
  wrapperRef: MutableRefObject<HTMLElement>
}

export function useInfiniteScroll({
  callback,
  wrapperRef,
  triggerRef
}: UseInfiniteScrollOptions) {
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const wrapperElement = wrapperRef.current
    const triggerElement = triggerRef.current

    if (callback) {
      const options = {
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0
      }

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      }, options)

      observer.current.observe(triggerElement)
    }

    return () => {
      if (observer.current && triggerElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.current.unobserve(triggerElement)
      }
    }
  }, [callback, triggerRef, wrapperRef])
}
