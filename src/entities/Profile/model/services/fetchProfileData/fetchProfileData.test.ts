import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { Country } from '../../../../../entities/Country'
import { Currency } from '../../../../../entities/Currency'
import { fetchProfileData } from './fetchProfileData'

const data = {
  first: 'Tikhon',
  lastname: 'Iz',
  username: 'Tim',
  city: 'Moscow',
  age: 22,
  country: Country.Russia,
  currency: Currency.RUB
}

describe('fetchProfileData.test', () => {
  test('success', async () => {
    // вынес переиспользованную логику в отдельный класс TestAsyncThunk
    const thunk = new TestAsyncThunk(fetchProfileData)

    thunk.api.get.mockReturnValue(Promise.resolve({ data }))

    const result = await thunk.callThunk()

    //  запрос был отправлен
    expect(thunk.api.get).toHaveBeenCalled()
    //  asyncThunk отработал без ошибки
    expect(result.meta.requestStatus).toBe('fulfilled')
    //  payload содержит данные пользователя
    expect(result.payload).toEqual(data)
  })

  test('error login', async () => {
    // вынес переиспользованную логику в отдельный класс TestAsyncThunk
    const thunk = new TestAsyncThunk(fetchProfileData)

    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))

    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toBe('rejected')
  })
})
