import {
  createEntityAdapter,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit'
import { type StateSchema } from 'app/providers/StoreProvider'
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorge'
import { type SortOrder } from 'shared/types/sort'
import { ArticleView, type Article } from '../../../../entities/Article'
import {
  ArticleSortField,
  ArticleType
} from '../../../../entities/Article/model/types/article'
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList'
import { type ArticlePageSchema } from '../types/articlePageSchema'

// Здесь используется нормализация данных
const articlesAdapter = createEntityAdapter<Article>({
  // поле по которому будет идти нормализация
  selectId: (article) => article.id
})

// селектор по которому получаются комментарии
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  // в getInitialState можно передать объект стейта по умолчанию
  (state) => state.articlesPage ?? articlesAdapter.getInitialState()
)

const articlesPageSlice = createSlice({
  name: 'articlePageSlice',
  initialState: articlesAdapter.getInitialState<ArticlePageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    view: ArticleView.LIST,
    page: 1,
    hasMore: true,
    _inited: false,
    limit: 9,
    sort: ArticleSortField.CREATED,
    search: '',
    order: 'asc',
    type: ArticleType.ALL
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      // сохраняем в локальном хранилище выбор пользователя
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    initState: (state) => {
      const view = localStorage.getItem(
        ARTICLES_VIEW_LOCALSTORAGE_KEY
      ) as ArticleView
      state.view = view
      state.limit = view === ArticleView.BAR ? 4 : 9
      state._inited = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state, action) => {
        state.error = undefined
        state.isLoading = true
        // если используется фильтр или сортировка, очищаем стейт
        if (action.meta.arg.replace) {
          articlesAdapter.removeAll(state)
        }
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.isLoading = false
        state.hasMore = action.payload.length >= state.limit
        // проверяем на использование сортировки или фильтров
        if (action.meta.arg.replace) {
          articlesAdapter.setAll(state, action.payload)
        } else {
          articlesAdapter.addMany(state, action.payload)
        }
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { reducer: articlePageReducer, actions: articlesPageActions } =
  articlesPageSlice
