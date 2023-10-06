import { type StateSchema } from 'app/providers/StoreProvider'
import { ValidateProfileError } from '../../types/profile'
import { getProfileValidateErrors } from './getProfileValidateErrors'

describe('getProfileValidateErrors.test', () => {
  test('should work with filled state', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [
          ValidateProfileError.INCORRECT_AGE,
          ValidateProfileError.INCORRECT_COUNTRY,
          ValidateProfileError.INCORRECT_USER_DATA,
          ValidateProfileError.NO_DATA,
          ValidateProfileError.SERVER_ERROR
        ]
      }
    }
    expect(getProfileValidateErrors(state as StateSchema)).toEqual([
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY,
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.NO_DATA,
      ValidateProfileError.SERVER_ERROR
    ])
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined)
  })
})
