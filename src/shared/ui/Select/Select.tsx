import { memo, useMemo, type ChangeEvent } from 'react'
import { classNames, type Mods } from 'shared/lib/classNames/classnames'
import cls from './Select.module.scss'

export interface SelectOption {
  value: string
  content: string
}

interface SelectProps {
  className?: string
  label?: string
  options?: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  readonly?: boolean
}

export const Select = memo((props: SelectProps): JSX.Element => {
  const { className, label, options, value, onChange, readonly } = props

  const mods: Mods = {}

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value)
  }

  const optionsList = useMemo(() => {
    return options?.map(item => (
      <option
        className={cls.option}
        value={item.value}
        key={item.value}
      >
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
})
