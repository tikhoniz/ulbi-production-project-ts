import { lazy } from 'react'

export const ArticleDetailsPageAsync = lazy(
  async () =>
    await new Promise((resolve) => {
      // @ts-ignore
      // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
      setTimeout(() => resolve(import('./ArticleDetailsPage')), 1500)
    })
)
