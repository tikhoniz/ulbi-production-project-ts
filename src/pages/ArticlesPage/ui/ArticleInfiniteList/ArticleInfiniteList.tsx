import { ArticleList } from '../../../../entities/Article'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { Text } from 'shared/ui/Text/Text'
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../../model/selectors/articlePageSelectors'
import { getArticles } from '../../model/slices/articlesPageSlice'

interface ArticleInfiniteListProps {
  className?: string
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const { className } = props
  // получаем данные из стейта
  const articles = useAppSelector(getArticles.selectAll)
  const isLoading = useAppSelector(getArticlesPageIsLoading)
  const view = useAppSelector(getArticlesPageView)
  const error = useAppSelector(getArticlesPageError)
  const { t } = useTranslation()

  if (error) {
    return <Text text={t('Ошибка при загрузке статей')} />
  }

  return (
    <ArticleList
      isLoading={isLoading}
      view={view}
      articles={articles}
      className={className}
    />
  )
})
