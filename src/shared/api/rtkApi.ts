// Создаем api для RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorge'

// Define a service using a base URL and expected endpoints
// Название инстанса rtkApi
export const rtkApi = createApi({
  reducerPath: 'api',
  /*
  в качестве baseUrl используем глобальную переменную __API__ которую определяем в config/build/buildPlugins.ts куда данные приходят из webpack.config.ts
  */
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    /* необходимо добавить перехватчик, чтобы добавить соответствующий header в config */
    /* interceptor отрабатывает перед каким-то действием */
    prepareHeaders(headers, api) {
      const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) ?? ''
      // добавляем guard, если token существует то добавляем его в header
      if (token) {
        headers.set('Authorization', token)
      }
      // и возвращаем headers
      return headers
    }
  }),
  /*
  если все endpoints указывать здесь, то в какой-то момент их может стать слишком много.
  нужно решить как эти endpoints инжектить асинхронно и лениво
  гуглим rtk query injectendpoints и по адресу https://redux-toolkit.js.org/rtk-query/usage/code-splitting и используем injectEndpoints
   */
  endpoints: (builder) => ({})
})
