import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider/config/store'
import { loginByUsername } from 'features/AuthByUsername/model/services/login/loginByUsername'
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import { Button } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import cls from './LoginForm.module.scss'

interface LoginFormProps {
  className?: string
}

export const LoginForm = memo(({ className }: LoginFormProps): JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { username, password, error, isLoading } = useAppSelector(state => state.loginReducer)

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

  const onLoginClick = useCallback(() => {
    void dispatch(loginByUsername({ username, password }))
  }, [dispatch, password, username])

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={t('authform')} />
      {error && (
        <Text
          text={error}
          theme={TextTheme.ERROR}
        />
      )}
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
  )
})
