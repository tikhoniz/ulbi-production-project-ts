import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import {
  ValidateProfileError,
  type Profile
} from '../../../../../entities/Profile/model/types/profile'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'
import { validateProfileData } from '../validateProfileData/validateProfileData'

// типы которые ожидаются на вход
export const updateProfileData = createAsyncThunk<
  Profile, // дженерик, то что возвращаем
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  void, // дженерик, аргумент ожидаемый на вход
  ThunkConfig<ValidateProfileError[]> // третьим дженериком  createAsyncThunk принимает AsyncThunkConfig в котором есть несколько параметров (state, dispatch, extra, rejectValue и т.д.)
>('profile/updateProfileData', async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi

  const formData = getProfileForm(getState())

  const errors = validateProfileData(formData)

  // если есть хоть одна ошибка, вернуть rejectWithValue
  if (errors.length) return rejectWithValue(errors)

  try {
    const response = await extra.api.put<Profile>(
      `/profile/${formData?.id}`,
      formData
    )
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
    return rejectWithValue([ValidateProfileError.SERVER_ERROR])
  }
})
