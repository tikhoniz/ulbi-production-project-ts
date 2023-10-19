import { lazy, type FC } from 'react'
import { type AddNewCommentProps } from './AddNewComment'

// TODO убрать FC и посмотреть какая ошибка возникает
export const AddNewCommentAsync = lazy<FC<AddNewCommentProps>>(
  async () =>
    await new Promise((resolve) => {
      // @ts-ignore
      // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
      setTimeout(() => resolve(import('./AddNewComment')), 1500)
    })
)
