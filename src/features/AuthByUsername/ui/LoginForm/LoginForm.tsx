/* eslint-disable spaced-comment */
import { getLoginError } from 'features/AuthByUsername/model/selectors/getLoginError/getLoginError'
import { getLoginIsLoading } from 'features/AuthByUsername/model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginPassword } from 'features/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword'
import { getLoginUsername } from 'features/AuthByUsername/model/selectors/getLoginUsername/getLoginUsername'
import { loginByUsername } from 'features/AuthByUsername/model/services/login/loginByUsername'
import {
  loginActions,
  loginReducer
} from 'features/AuthByUsername/model/slice/loginSlice'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  useAppDispatch,
  useAppSelector
} from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { Button } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import cls from './LoginForm.module.scss'

interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const initialReducers: ReducersList = {
  loginForm: loginReducer
}

const LoginForm = memo(
  ({ className, onSuccess }: LoginFormProps): JSX.Element => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    // получаем данные из стейта
    const username = useAppSelector(getLoginUsername)
    const password = useAppSelector(getLoginPassword)
    const error = useAppSelector(getLoginError)
    const isLoading = useAppSelector(getLoginIsLoading)

    const onChangeUsername = useCallback(
      (value: string): void => {
        dispatch(loginActions.setUsername(value))
      },
      [dispatch]
    )

    const onChangePassword = useCallback(
      (value: string): void => {
        dispatch(loginActions.setPassword(value))
      },
      [dispatch]
    )

    const onLoginClick = useCallback(async () => {
      const result = await dispatch(loginByUsername({ username, password }))
      if (result.meta.requestStatus === 'fulfilled') {
        onSuccess()
      }
    }, [dispatch, password, username, onSuccess])

    return (
      // DynamicModuleLoader позволяет вынести часть логики в переиспользуемый компонент, в данном случае асинхронное удаление и добавление редьюсера
      <DynamicModuleLoader reducers={initialReducers}>
        <div className={classNames(cls.LoginForm, {}, [className])}>
          <Text title={t('authform')} />
          {error && <Text text={error} theme={TextTheme.ERROR} />}
          <Input
            autofocus
            value={username}
            onChange={onChangeUsername}
            type='text'
            className={cls.input}
          />
          <Input
            value={password}
            onChange={onChangePassword}
            type='text'
            className={cls.input}
          />
          <Button
            className={cls.loginBtn}
            onClick={onLoginClick}
            disabled={isLoading}
          >
            {t('login')}
          </Button>
        </div>
      </DynamicModuleLoader>
    )
  }
)

export default LoginForm
