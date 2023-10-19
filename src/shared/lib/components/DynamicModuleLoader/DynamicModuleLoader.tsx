import { type Reducer } from '@reduxjs/toolkit'
import { type ReduxStoreWithManager } from 'app/providers/StoreProvider'
import {
  type StateSchema,
  type StateSchemaKey
} from 'app/providers/StoreProvider/config/StateSchema'
import { useEffect, type ReactNode } from 'react'
import { useDispatch, useStore } from 'react-redux'

// список на случай передачи нескольких редьюсеров
export type ReducersList = {
  [keyName in StateSchemaKey]?: Reducer<NonNullable<StateSchema[keyName]>>
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DynamicModuleLoaderProps {
  reducers: ReducersList
  // флаг определяющий удалять редьюсер или нет
  removeAfterUnmount?: boolean
  children: ReactNode
}

export const DynamicModuleLoader = (
  props: DynamicModuleLoaderProps
): JSX.Element => {
  const { children, reducers, removeAfterUnmount = true } = props

  const store = useStore() as ReduxStoreWithManager
  // const dispatch = useAppDispatch()
  const dispatch = useDispatch()

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers()
    // подгружаем редьюсер только когда компонент вмонтирован
    // Object.entries всегда воспринимает ключи объекта как строки, поэтому будет несоответствие типов, поэтому напрямую кастуем тип keyName к StateSchemaKey
    Object.entries(reducers).forEach(([keyName, reducer]) => {
      const mounted = mountedReducers[keyName as StateSchemaKey]

      if (!mounted) {
        store.reducerManager.add(keyName as StateSchemaKey, reducer)
        dispatch({ type: `@INIT ${keyName} reducer` })
      }
    })

    return () => {
      // если флаг removeAfterUnmount = true
      // удаляем редьюсеры если ушли со страницы
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([keyName, reducer]) => {
          // удаляем редьюсер  когда компонент размонтирован
          store.reducerManager.remove(keyName as StateSchemaKey)
          dispatch({ type: `@DESTROY ${keyName} reducer` })
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}
