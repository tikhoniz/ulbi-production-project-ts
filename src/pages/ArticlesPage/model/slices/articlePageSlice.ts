import {
  createEntityAdapter,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit'
import { type StateSchema } from 'app/providers/StoreProvider'
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorge'
import { ArticleView, type Article } from '../../../../entities/Article'
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList'
import { type ArticlePageSchema } from '../types/articlePageSchema'

// Здесь используется нормализация данных
const articleAdapter = createEntityAdapter<Article>({
  // поле по которому будет идти нормализация
  selectId: (article) => article.id
})

// селектор по которому получаются комментарии
export const getArticles = articleAdapter.getSelectors<StateSchema>(
  // в getInitialState можно передать объект стейта по умолчанию
  (state) => state.articlesPage ?? articleAdapter.getInitialState()
)

const articlePageSlice = createSlice({
  name: 'articlePageSlice',
  initialState: articleAdapter.getInitialState<ArticlePageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    view: ArticleView.LIST
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      // сохраняем в локальном хранилище выбор пользователя
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    initState: (state) => {
      state.view = localStorage.getItem(
        ARTICLES_VIEW_LOCALSTORAGE_KEY
      ) as ArticleView
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchArticlesList.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.isLoading = false
          articleAdapter.setAll(state, action.payload)
        }
      )
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { reducer: articlePageReducer, actions: articlesPageActions } =
  articlePageSlice
