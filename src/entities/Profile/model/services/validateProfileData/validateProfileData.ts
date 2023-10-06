import { ValidateProfileError, type Profile } from '../../types/profile'

export const validateProfileData = (profile?: Profile) => {
  // если профиль не проиницилизирован вернуть ошибку
  if (!profile) return [ValidateProfileError.NO_DATA]

  const { first, lastname, age, country } = profile

  const errors: ValidateProfileError[] = []

  if (!first || !lastname) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA)
  }
  // * !Number.isInteger не целочисленное число
  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateProfileError.INCORRECT_AGE)
  }

  if (!country) {
    errors.push(ValidateProfileError.INCORRECT_COUNTRY)
  }

  return errors
}
