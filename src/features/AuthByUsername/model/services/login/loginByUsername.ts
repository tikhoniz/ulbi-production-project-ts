import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import i18n from 'shared/config/i18n/i18n'
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
  { rejectValue: string } // третьим дженериком  createAsyncThunk принимает AsyncThunkConfig в котором есть несколько параметров (state, dispatch, extra, rejectValue и т.д.)
>('login/loginByUsername', async (authData, thunkAPI) => {
  try {
    const response = await axios.post<User>('http://localhost:8000/login', authData)

    // проверка для подстраховки
    if (!response.data) {
      throw new Error()
    }
    // записываем в localStorage токен, что пользователь авторизован
    // Поскольку в localStorage можно хранить только строки, переводим ответ от сервера в строковый формат
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
    // сохраняем данные в стейт
    thunkAPI.dispatch(userActions.setAuthData(response.data))

    return response.data
  } catch (e) {
    console.log(e)
    // вернуть можно только string
    return thunkAPI.rejectWithValue(i18n.t('errors.wrong_name_or_pass'))
  }
})
