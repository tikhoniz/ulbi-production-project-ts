import { type EntityState } from '@reduxjs/toolkit'
import { type Comment } from '../../../../entities/Comment'

// EntityState добавляет в типы массив айдишников и сущности в виде словаря
export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
  isLoading?: boolean
  error?: string
}
