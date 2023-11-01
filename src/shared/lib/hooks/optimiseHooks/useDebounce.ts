import { type MutableRefObject, useCallback, useRef } from 'react'
// позволяет отменять предыдущее событие в течении какого-то времени, т.е. пока что-то вводится в инпут колбэк выполняться не будет

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const timer = useRef() as MutableRefObject<any>

  return useCallback(
    (...args: any[]) => {
      // если в timer.current уже сохранен какой-то таймаут, то мы его очищаем
      if (timer.current) {
        clearTimeout(timer.current)
      }
      timer.current = setTimeout(() => {
        // eslint-disable-next-line n/no-callback-literal
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )
}
