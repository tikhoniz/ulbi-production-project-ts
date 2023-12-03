import { memo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  useAppDispatch,
  useAppSelector
} from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Page } from 'widgets/Page/Page'
import { ArticleList } from '../../../../entities/Article'
import {
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../../model/selectors/articlePageSelectors'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import {
  articlePageReducer,
  getArticles
} from '../../model/slices/articlesPageSlice'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import cls from './ArticlesPage.module.scss'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlePageReducer
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props
  // const { t } = useTranslation()
  const dispatch = useAppDispatch()
  // получаем данные из стейта
  const articles = useAppSelector(getArticles.selectAll)
  const isLoading = useAppSelector(getArticlesPageIsLoading)
  const view = useAppSelector(getArticlesPageView)
  // const error = useAppSelector(getArticlesPageError)
  const [searchParams] = useSearchParams()

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    // будет срабатывать только в случае если стэйт не инициализирован
    dispatch(initArticlesPage(searchParams))
  })

  return (
    // не удаляем редьюсер с данными о статьях, чтобы можно было вернуться назад к списку статей на загружая их вновь
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticlesPageFilters />
        <ArticleList view={view} isLoading={isLoading} articles={articles} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
