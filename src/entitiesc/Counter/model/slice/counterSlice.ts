import { createSlice } from '@reduxjs/toolkit'
import type { CounterSchema } from '../types/CounterSchema'

const initialState: CounterSchema = {
  value: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    }
  }
})
// переименовываем для удобства
//  const { actions: counterActions, reducer: counterReducer } = counterSlice

export const { actions: counterActions } = counterSlice
export const { reducer: counterReducer } = counterSlice
