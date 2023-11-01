import { useCallback, useRef } from 'react'
// первым аргументом принимает событие которое должно произойти
export function useThrottle(callback: (...args: any[]) => void, delay: number) {
  // используется в качестве стора для хранения булевого значения
  const throttleRef = useRef(false)

  return useCallback(
    (...args: any[]) => {
      // если значение флага false колбэк выполняется
      if (!throttleRef.current) {
        // eslint-disable-next-line n/no-callback-literal
        callback(...args)
        throttleRef.current = true
        // по истечении задержки флаг становится false и снова выполнится колбэк
        setTimeout(() => {
          throttleRef.current = false
        }, delay)
      }
    },
    [callback, delay]
  )
}
