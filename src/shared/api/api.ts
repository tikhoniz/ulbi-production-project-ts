import axios from 'axios'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorge'

// const baseURL = __IS_DEV__ ? 'http://localhost:8000' : 'https://brightspilates.com'

// в baseURL указываем порт на котором бекэнд
export const $api = axios.create({
  baseURL: __API__
})

/* необходимо добавить перехватчик, поскольку мы пользователя достаем из локалстораджа в момент создания инстанса, и когда мы авторизовались, инстанс уже был создан и даже после авторизации в строке authorization остается пустая строка */

/* interceptors отрабатывает перед каким-то действием */

$api.interceptors.request.use((config) => {
  // добавляем guard
  if (config.headers) {
    config.headers.Authorization =
      localStorage.getItem(USER_LOCALSTORAGE_KEY) ?? ''
  }

  return config
})
