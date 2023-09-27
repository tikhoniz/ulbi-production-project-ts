import { memo } from 'react'
import { type Mods, classNames } from 'shared/lib/classNames/classnames'
import cls from './Text.module.scss'

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center'
}

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error'
}

interface TextProps {
  className?: string
  title?: string
  text?: string
  theme?: TextTheme
  align?: TextAlign
}

export const Text = memo((props: TextProps) => {
  const { className, text, title, theme = TextTheme.PRIMARY, align = TextAlign.LEFT } = props

  const mods: Mods = {
    [cls[theme]]: true,
    [cls[align]]: true
  }

  return (
    <div className={classNames(cls.Text, mods, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  )
})
