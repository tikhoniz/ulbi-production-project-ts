import type { LoginSchema } from 'features/AuthByUsername'
import type { UserSchema } from '../../../../entities/User'

export interface StateSchema {
  user: UserSchema
  loginForm?: LoginSchema
}
