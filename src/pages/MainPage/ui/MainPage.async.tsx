import { lazy } from 'react'

// export const MainPageAsync = lazy(
//   async () =>
//     await new Promise(resolve => {
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-expect-error
//       // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
//       setTimeout(() => resolve(import('./MainPage')), 1500)
//     })
// )

export const MainPageAsync = lazy(async () => await import('./MainPage'))
