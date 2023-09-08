import { createSelector } from '@reduxjs/toolkit'
import type { CounterSchema } from '../../types/CounterSchema'
import { getCounter } from '../getCounter/getCounter'

// с помощью функции createSelector из библиотеки reselect которая уже зашита внутри redux toolkit можно переиспользовать другие селекторы
export const getCounterValue = createSelector(getCounter, (counter: CounterSchema) => counter.value)
