import { useMemo, type ChangeEvent } from 'react'
import { classNames, type Mods } from 'shared/lib/classNames/classnames'
import cls from './Select.module.scss'

export interface SelectOption<T extends string> {
  value: T
  content: string
}

interface SelectProps<T extends string> {
  className?: string
  label?: string
  options?: Array<SelectOption<T>>
  value?: T
  onChange?: (value: string) => void
  readonly?: boolean
}

// использование memo плохо сочетается с дженериками
export const Select = <T extends string>(
  props: SelectProps<T>
): JSX.Element => {
  const { className, label, options, value, onChange, readonly } = props

  const mods: Mods = {}

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value)
  }

  const optionsList = useMemo(() => {
    return options?.map((item) => (
      <option className={cls.option} value={item.value} key={item.value}>
        {item.content}
      </option>
    ))
  }, [options])

  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && <span className={cls.label}>{label}</span>}
      <select
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
        disabled={readonly}
      >
        {optionsList}
      </select>
    </div>
  )
}
