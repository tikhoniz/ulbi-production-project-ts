import { type EntityState } from '@reduxjs/toolkit'
import { type ArticleView, type Article } from '../../../../entities/Article'

export interface ArticlePageSchema extends EntityState<Article> {
  isLoading?: boolean
  error?: string

  view: ArticleView
}
