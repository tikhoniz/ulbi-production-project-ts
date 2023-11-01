import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import { ArticleView, type Article } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import cls from './ArticleList.module.scss'
import { Text, TextSize } from 'shared/ui/Text/Text'

interface ArticleListProps {
  className?: string
  // articles: Article[]
  articles: any
  isLoading?: boolean
  view?: ArticleView
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.LIST ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ))

export const ArticleList = memo((props: ArticleListProps): JSX.Element => {
  const { t } = useTranslation()
  const { className, articles, view = ArticleView.BAR, isLoading } = props

  if (isLoading) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {getSkeletons(view)}
      </div>
    )
  }

  const renderArticle = (article: Article) => {
    return (
      <ArticleListItem
        article={article}
        view={view}
        className={cls.card}
        key={article.id}
      />
    )
  }
  //  если отсутствуют статьи
  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдены')} />
      </div>
    )
  }

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
    </div>
  )
})
