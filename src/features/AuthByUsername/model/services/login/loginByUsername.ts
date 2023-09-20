import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ThunkConfig } from 'app/providers/StoreProvider'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorge'
import { userActions, type User } from '../../../../../entities/User'

// типы которые ожидаются на вход
interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<
  User, // дженерик, то что возвращаем
  LoginByUsernameProps, // дженерик, аргумент ожидаемый на вход
  ThunkConfig<string> // третьим дженериком  createAsyncThunk принимает AsyncThunkConfig в котором есть несколько параметров (state, dispatch, extra, rejectValue и т.д.)
>('login/loginByUsername', async (authData, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi

  try {
    const response = await extra.api.post<User>('/login', authData)
    // проверка для подстраховки
    if (!response.data) {
      throw new Error()
    }
    // записываем в localStorage токен, что пользователь авторизован
    // Поскольку в localStorage можно хранить только строки, переводим ответ от сервера в строковый формат
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
    // сохраняем данные в стейт
    dispatch(userActions.setAuthData(response.data))

    return response.data
  } catch (e) {
    console.log(e)
    // вернуть можно только string
    return rejectWithValue('errors.wrong_name_or_pass')
  }
})
