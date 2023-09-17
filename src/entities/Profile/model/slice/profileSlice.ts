import { createSlice } from '@reduxjs/toolkit'
import type { ProfileSchema } from '../types/profile'

const initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  error: undefined,
  data: undefined
}

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {}
})

export const profileActions = ProfileSlice.actions
export const profileReducer = ProfileSlice.reducer
