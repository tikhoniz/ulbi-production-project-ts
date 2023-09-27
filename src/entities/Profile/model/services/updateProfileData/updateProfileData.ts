import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'
import { type Profile } from '../../types/profile'

// типы которые ожидаются на вход
export const updateProfileData = createAsyncThunk<
Profile, // дженерик, то что возвращаем
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
void, // дженерик, аргумент ожидаемый на вход
ThunkConfig<string> // третьим дженериком  createAsyncThunk принимает AsyncThunkConfig в котором есть несколько параметров (state, dispatch, extra, rejectValue и т.д.)
>('profile/updateProfileData', async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi

  const formData = getProfileForm(getState())

  try {
    const response = await extra.api.put<Profile>('/profile', formData)
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
