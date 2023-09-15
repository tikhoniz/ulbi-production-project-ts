import { type Reducer } from '@reduxjs/toolkit'
import { type ReduxStoreWithManager } from 'app/providers/StoreProvider'
import { type StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { useEffect, type FC } from 'react'
import { useStore } from 'react-redux'

// список на случай передачи нескольких редьюсеров
export type ReducersList = {
  [keyName in StateSchemaKey]?: Reducer
}
export type ReducersListEntry = [StateSchemaKey, Reducer]

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DynamicModuleLoaderProps {
  children: any
  reducers: ReducersList
  // флаг определяющий удалять редьюсер или нет
  removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props): JSX.Element => {
  const { children, reducers, removeAfterUnmount } = props
  const dispatch = useAppDispatch()

  const store = useStore() as ReduxStoreWithManager

  useEffect(() => {
    // подгружаем редьюсер только когда компонент вмонтирован
    Object.entries(reducers).forEach(([keyName, reducer]: ReducersListEntry) => {
      store.reducerManager.add(keyName, reducer)
      dispatch({ type: `@INIT ${keyName} reducer` })
    })

    return () => {
      // если флаг removeAfterUnmount = true
      if (removeAfterUnmount ?? false) {
        Object.entries(reducers).forEach(([keyName, reducer]: ReducersListEntry) => {
          // удаляем редьюсер  когда компонент размонтирован
          store.reducerManager.remove(keyName)
          dispatch({ type: `@DESTROY ${keyName} reducer` })
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>{children}</>
}
