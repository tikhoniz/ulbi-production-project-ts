import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorge'
import type { User, UserSchema } from '../types/user'

const initialState: UserSchema = {
  _mounted: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // записываем данные пользователя в стейт
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
    },
    // проверка залогинин ли пользователь
    initAuthData: state => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      if (user) state.authData = JSON.parse(user)
      state._mounted = true
    },
    logout: state => {
      state.authData = undefined
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    }
  }
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
