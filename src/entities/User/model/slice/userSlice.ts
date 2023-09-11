import { createSlice } from '@reduxjs/toolkit'
import type { UserSchema } from '../types/user'

const initialState: UserSchema = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
})
// переименовываем для удобства
export const { actions: userActions, reducer: userReducer } = userSlice
