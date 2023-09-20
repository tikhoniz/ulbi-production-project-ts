import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { userActions } from '../../../../../entities/User'
import { loginByUsername } from './loginByUsername'

describe('loginByUsername.test', () => {
  // test('success login', async () => {
  //   const userValue = { username: '123', id: '1' }
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }))
  //   const action = loginByUsername({ username: '123', password: '123' })
  //   const result = await action(dispatch, getState, undefined)

  //    сохраняются ли данные в стейте
  //   expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
  //    диспатч был вызван три раза
  //   expect(dispatch).toHaveBeenCalledTimes(3)
  //    запрос был отправлен
  //   expect(mockedAxios.post).toHaveBeenCalled()
  //    asyncThunk отработал без ошибки
  //   expect(result.meta.requestStatus).toBe('fulfilled')
  //    payload содержит данные пользователя
  //   expect(result.payload).toEqual(userValue)
  // })

  // test('error login', async () => {
  //   mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
  //   const action = loginByUsername({ username: '123', password: '123' })
  //   const result = await action(dispatch, getState, undefined)

  //    диспатч был вызван два раза
  //   expect(dispatch).toHaveBeenCalledTimes(2)
  //    запрос был отправлен
  //   expect(mockedAxios.post).toHaveBeenCalled()
  //    asyncThunk отработал без ошибки
  //   expect(result.meta.requestStatus).toBe('rejected')
  //    в случае ошибки payload равняется error
  //   expect(result.payload).toBe('errors.wrong_name_or_pass')
  // })

  test('success login', async () => {
    const userValue = { username: '123', id: '1' }

    // вынес переиспользованную логику в отдельный класс TestAsyncThunk
    const thunk = new TestAsyncThunk(loginByUsername)
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }))

    const result = await thunk.callThunk({ username: '123', password: '123' })

    //  сохраняются ли данные в стейте
    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
    //  диспатч был вызван три раза
    expect(thunk.dispatch).toHaveBeenCalledTimes(3)
    //  запрос был отправлен
    expect(thunk.api.post).toHaveBeenCalled()
    //  asyncThunk отработал без ошибки
    expect(result.meta.requestStatus).toBe('fulfilled')
    //  payload содержит данные пользователя
    expect(result.payload).toEqual(userValue)
  })

  test('error login', async () => {
    // вынес переиспользованную логику в отдельный класс TestAsyncThunk
    const thunk = new TestAsyncThunk(loginByUsername)
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await thunk.callThunk({ username: '123', password: '123' })

    //  диспатч был вызван два раза
    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    //  запрос был отправлен
    expect(thunk.api.post).toHaveBeenCalled()
    //  asyncThunk отработал без ошибки
    expect(result.meta.requestStatus).toBe('rejected')
    //  в случае ошибки payload равняется error
    expect(result.payload).toBe('errors.wrong_name_or_pass')
  })
})
