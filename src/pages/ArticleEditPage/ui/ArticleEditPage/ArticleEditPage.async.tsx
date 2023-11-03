import { lazy } from 'react'

// export const ArticleEditPageAsync = lazy(
//   async () =>
//     await new Promise((resolve) => {
//       // @ts-ignore
//       // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
//       setTimeout(() => resolve(import('./ArticleEditPage')), 400)
//     })
// )

export const ArticleEditPageAsync = lazy(
  async () => await import('./ArticleEditPage')
)
