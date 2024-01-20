import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'

import { ArticleRecommendationList } from 'features/articleRecommendationList'
import { VerticalStack } from 'shared/ui/Stack'
import { Page } from 'widgets/Page/Page'
import { ArticleDetails } from '../../../../entities/Article'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { articleDetailsPageReducer } from '../../model/slices'
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import cls from './ArticleDetailsPage.module.scss'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps): JSX.Element => {
  const { className } = props
  const { t } = useTranslation('article')
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  // useInitialEffect используется для того, что бы получение данных не срабатывало, если идет иницилизация storybook
  useInitialEffect(() => {
    if (id) {
      dispatch(fetchCommentsByArticleId(id))
    }
  })

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('ArticleNotFound')}
      </Page>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <VerticalStack gap='16' fullWidth>
          <ArticleDetailsPageHeader />
          {/* текст статьи */}
          <ArticleDetails id={id} />
          {/* рекомендованные статьи */}
          <ArticleRecommendationList />
          <ArticleDetailsComments id={id} />
        </VerticalStack>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
