import { type EntityState } from '@reduxjs/toolkit'
import { type Article } from '../../../../entities/Article'

// EntityState добавляет в типы массив айдишников и сущности в виде словаря
export interface ArticleDetailsRecommendationsSchema
  extends EntityState<Article> {
  isLoading?: boolean
  error?: string
}
