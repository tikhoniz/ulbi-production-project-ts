import { type EntityState } from '@reduxjs/toolkit'
import { type Article, type ArticleView } from '../../../../entities/Article'

export interface ArticlePageSchema extends EntityState<Article> {
  isLoading?: boolean
  error?: string

  view: ArticleView
  // пагинация
  page: number
  limit?: number
  hasMore: boolean
  // флаг инициализировался стейт или нет
  // нижнее подчеркивание означает что флаг изменится единожды и потом меняться уже не будет
  _inited: boolean
}
