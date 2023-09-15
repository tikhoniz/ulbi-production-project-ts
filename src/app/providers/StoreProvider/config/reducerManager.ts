// позволяет сделать подключение редьюсеров асинхронным, что поможет сделать основной бандл меньше, что улучшит оптимизацию
import type { AnyAction, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import type { ReducerManager, StateSchema, StateSchemaKey } from './StateSchema'

// на вход принимает initialReducers - дефолтные редьюсеры
export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>
): ReducerManager {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers }
  // создаем корневой редьюсер
  let combinedReducer = combineReducers(reducers)
  // хранит название редьюсеров которые мы хотим удалить
  let keysToRemove: StateSchemaKey[] = []

  return {
    getReducerMap: () => reducers,
    // принимает стейт и экшн, но если в массиве keysToRemove есть какие либо ключи, то мы эти редьюсеры из стейта удаляем
    // This will be passed to the store
    reduce: (state: StateSchema, action: AnyAction) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = { ...state }
        for (const key of keysToRemove) {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete state[key]
        }
        keysToRemove = []
      }
      // возвращаем новый корневой редьюсер
      return combinedReducer(state, action)
    },
    // Добавляет новый редьюсер с указанным ключом
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || !reducers[key]) {
        return
      }
      // Add the reducer to the reducer mapping
      reducers[key] = reducer
      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers)
    },
    // Удаляет  редьюсер с указанным ключом
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return
      }
      // Remove it from the reducer mapping
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete reducers[key]
      // Add the key to the list of keys to clean up
      keysToRemove.push(key)
      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers)
    }
  }
}
