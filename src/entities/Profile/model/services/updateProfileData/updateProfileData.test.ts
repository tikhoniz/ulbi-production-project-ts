import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { Country } from '../../../../Country'
import { Currency } from '../../../../Currency'
import { ValidateProfileError } from '../../types/profile'
import { updateProfileData } from './updateProfileData'

const data = {
  first: 'Tikhon',
  lastname: 'Iz',
  username: 'Tim',
  city: 'Moscow',
  age: 22,
  country: Country.Russia,
  currency: Currency.RUB,
  id: '1'
}

describe('updateProfileData.test', () => {
  test('success', async () => {
    // вынес переиспользованную логику в отдельный класс TestAsyncThunk
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data
      }
    })

    thunk.api.put.mockReturnValue(Promise.resolve({ data }))

    const result = await thunk.callThunk()

    //  запрос был отправлен
    expect(thunk.api.put).toHaveBeenCalled()
    //  asyncThunk отработал без ошибки
    expect(result.meta.requestStatus).toBe('fulfilled')
    //  payload содержит данные пользователя
    expect(result.payload).toEqual(data)
  })

  test('error', async () => {
    // вынес переиспользованную логику в отдельный класс TestAsyncThunk
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data
      }
    })
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }))

    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR])
  })

  test('validate error', async () => {
    // вынес переиспользованную логику в отдельный класс TestAsyncThunk
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: { ...data, lastname: '' }
      }
    })

    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
  })
})
