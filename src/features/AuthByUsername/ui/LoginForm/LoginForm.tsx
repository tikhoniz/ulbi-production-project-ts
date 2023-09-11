import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classnames'
import { Button } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import cls from './LoginForm.module.scss'

interface LoginFormProps {
  className?: string
}

export const LoginForm = ({ className }: LoginFormProps): JSX.Element => {
  const { t } = useTranslation()
  const [value, setValue] = useState('')

  const onChange = (val: string): void => {
    setValue(val)
  }

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input
        autofocus
        value={value}
        onChange={onChange}
        type='text'
        className={cls.input}
      />
      <Input
        value={value}
        onChange={onChange}
        type='text'
        className={cls.input}
      />
      <Button className={cls.loginBtn}>{t('Login')}</Button>
    </div>
  )
}
