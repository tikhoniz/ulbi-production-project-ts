import { AddNewComment } from 'features/addNewComment'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
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
import { Text } from 'shared/ui/Text/Text'

import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { ArticleDetails } from '../../../entities/Article'
import { CommentList } from '../../../entities/Comment'
import { getArticleCommentsIsLoading } from '../model/selectors/comments'
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle'
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import {
  articleDetailsCommentsReducer,
  getArticleComments
} from '../model/slices/articleDetailsCommentsSlice'
import cls from './ArticleDetailsPage.module.scss'
import { RoutePath } from 'shared/config/routeConfig/routePath'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps): JSX.Element => {
  const { className } = props
  const { t } = useTranslation('article')
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()

  // получаем комментарии использую нормализацию данных
  const comments = useAppSelector(getArticleComments.selectAll)
  const commentsIsLoading = useAppSelector(getArticleCommentsIsLoading)
  const navigate = useNavigate()

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [navigate])

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text))
    },
    [dispatch]
  )

  // useInitialEffect используется для того, что бы получение данных не срабатывало, если идет
  // иницилизация storybook
  useInitialEffect(() => {
    if (id) {
      dispatch(fetchCommentsByArticleId(id))
    }
  })

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('ArticleNotFound')}
      </div>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
          {t('Назад к списку')}
        </Button>
        <ArticleDetails id={id} />
        <Text className={cls.commentTitle} title={t('comments')} />
        <AddNewComment onSendComment={onSendComment} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
