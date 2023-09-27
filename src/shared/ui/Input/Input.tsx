import { memo, useRef, type ChangeEvent, type InputHTMLAttributes } from 'react'
import { classNames, type Mods } from 'shared/lib/classNames/classnames'
import cls from './Input.module.scss'

// Omit позволяет забрать из типа все пропсы и исключить которые не нужны
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string | number
  type?: string
  onChange?: (value: string) => void
  autofocus?: boolean
  placeholder?: string
  readonly?: boolean
}

export const Input = memo((props: InputProps): JSX.Element => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    autofocus = false,
    placeholder,
    readonly,
    ...otherProps
  } = props

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    // т.к. onChange не обязательный нужно применить опшинал чейнинг, если пропс onChange не передан функция вызвана не будет
    onChange?.(event.target.value)
  }

  return (
    <div className={classNames(cls.Input, {}, [className])}>
      <input
        placeholder={placeholder}
        autoFocus={autofocus}
        type={type}
        value={value}
        onChange={onChangeHandler}
        className={cls.input}
        readOnly={readonly}
        {...otherProps}
      />
    </div>
  )
})
