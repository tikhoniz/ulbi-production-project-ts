import axios from 'axios'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorge'

// const baseURL = __IS_DEV__ ? 'http://localhost:8000' : 'https://brightspilates.com'

// в baseURL указываем порт на котором бекэнд
export const $api = axios.create({
  baseURL: __API__,
  headers: {
    authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY)
  }
})
