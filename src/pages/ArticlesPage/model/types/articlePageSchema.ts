import { type EntityState } from '@reduxjs/toolkit'
import { type SortOrder } from 'shared/types/sort'
import { type Article, type ArticleView } from '../../../../entities/Article'
import {
  type ArticleType,
  type ArticleSortField
} from '../../../../entities/Article/model/types/article'

export interface ArticlePageSchema extends EntityState<Article> {
  isLoading?: boolean
  error?: string

  view: ArticleView
  // пагинация
  page: number
  limit: number
  hasMore: boolean
  // порядок сортировки
  order: SortOrder
  sort: ArticleSortField
  search: string
  type: ArticleType
  // флаг инициализировался стейт или нет
  // нижнее подчеркивание означает что флаг изменится единожды и потом меняться уже не будет
  _inited: boolean
}
