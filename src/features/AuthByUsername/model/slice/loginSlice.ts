import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { loginByUsername } from '../services/login/loginByUsername'
import type { LoginSchema } from '../types/loginSchema'

const initialState: LoginSchema = {
  isLoading: false,
  username: '',
  password: ''
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  // не меняет стейт
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    }
  },
  // изменяет стейт
  extraReducers: builder => {
    builder
      .addCase(loginByUsername.pending, state => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(loginByUsername.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const loginActions = loginSlice.actions
export const loginReducer = loginSlice.reducer
