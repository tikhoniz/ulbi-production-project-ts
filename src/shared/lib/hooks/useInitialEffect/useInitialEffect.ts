import { useEffect } from 'react'

// используется для того, что бы получение данных не срабатывало, если идет
// иницилизация storybook
export function useInitialEffect(callback: () => void) {
  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      callback()
    }
    // eslint-disable-next-line
  }, [])
}
