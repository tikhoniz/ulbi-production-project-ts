import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { type Profile } from '../../types/profile'

// типы которые ожидаются на вход
export const fetchProfileData = createAsyncThunk<
Profile, // дженерик, то что возвращаем
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
string, // дженерик, аргумент ожидаемый на вход
ThunkConfig<string> // третьим дженериком  createAsyncThunk принимает AsyncThunkConfig в котором есть несколько параметров (state, dispatch, extra, rejectValue и т.д.)
>('profile/fetchProfileData', async (profileId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi

  try {
    const response = await extra.api.get<Profile>(`/profile/${profileId}`)
    // проверка для подстраховки
    if (!response.data) {
      throw new Error()
    }

    // для теста ощибки при получении данных
    // throw new Error()
    return response.data
  } catch (e) {
    console.log(e)
    // вернуть можно только string
    return rejectWithValue('error')
  }
})
