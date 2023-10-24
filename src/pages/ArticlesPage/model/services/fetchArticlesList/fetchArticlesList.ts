import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { type Article } from '../../../../../entities/Article'

export const fetchArticlesList = createAsyncThunk<
Article[],
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
void,
ThunkConfig<string>
>('articlePage/fetchArticlesList', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi

  try {
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        // TODO разобраться с _expand, и почему он подтягивает юзера
        _expand: 'user'
      }
    })

    if (!response.data) {
      throw new Error()
    }
    console.log('response.data', response.data)

    return response.data
  } catch (e) {
    return rejectWithValue('error')
  }
})
