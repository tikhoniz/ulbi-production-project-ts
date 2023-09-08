import type { CounterSchema } from '../types/CounterSchema'
import { counterActions, counterReducer } from './counterSlice'

describe('counterSlice.test', () => {
  test('increment', () => {
    const state: CounterSchema = { value: 10 }

    expect(counterReducer(state, counterActions.increment)).toEqual({ value: 11 })
  })

  test('decrement', () => {
    const state: CounterSchema = { value: 10 }

    expect(counterReducer(state, counterActions.decrement)).toEqual({ value: 9 })
  })

  // проверка работы при пустом тесте
  test('should work with empty state', () => {
    expect(counterReducer(undefined, counterActions.increment)).toEqual({ value: 1 })
  })
})
