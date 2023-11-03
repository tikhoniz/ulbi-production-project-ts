import { AddNewComment } from 'features/addNewComment'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classnames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  useAppDispatch,
  useAppSelector
} from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Text, TextSize } from 'shared/ui/Text/Text'

import { getArticleRecommendationsIsLoading } from 'pages/ArcticleDetailsPage/model/selectors/recommendations'
import { fetchArticleRecommendations } from 'pages/ArcticleDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations'
import { articleDetailsPageReducer } from 'pages/ArcticleDetailsPage/model/slices'
import { getArticleRecommendations } from 'pages/ArcticleDetailsPage/model/slices/articleDetailsPageRecommendationsSlice'
import { Page } from 'widgets/Page/Page'
import { ArticleDetails, ArticleList } from '../../../../entities/Article'
import { CommentList } from '../../../../entities/Comment'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
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

  // получаем комментарии использую нормализацию данных
  const comments = useAppSelector(getArticleComments.selectAll)
  const commentsIsLoading = useAppSelector(getArticleCommentsIsLoading)
  const recommendations = useAppSelector(getArticleRecommendations.selectAll)
  const recommendationsIsLoading = useAppSelector(
    getArticleRecommendationsIsLoading
  )

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text))
    },
    [dispatch]
  )

  // useInitialEffect используется для того, что бы получение данных не срабатывало, если идет иницилизация storybook
  useInitialEffect(() => {
    if (id) {
      dispatch(fetchCommentsByArticleId(id))
      // получаем рекомендованные статьи
      dispatch(fetchArticleRecommendations())
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
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <Text
          size={TextSize.L}
          className={cls.commentTitle}
          title={t('Рекомендуем')}
        />
        {/* рекомендованные статьи */}
        <ArticleList
          articles={recommendations}
          isLoading={recommendationsIsLoading}
          className={cls.recommendations}
          target='_blank'
        />
        <Text
          size={TextSize.L}
          className={cls.commentTitle}
          title={t('comments')}
        />
        <AddNewComment onSendComment={onSendComment} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
