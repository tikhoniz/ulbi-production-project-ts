import { useMemo, type CSSProperties } from 'react'
import { classNames, type Mods } from 'shared/lib/classNames/classnames'
import cls from './Avatar.module.scss'

interface AvatarProps {
  className?: string
  src?: string
  alt?: string
  size?: number
}

export const Avatar = ({ className, src, alt, size }: AvatarProps): JSX.Element => {
  const mods: Mods = {}

  const styles = useMemo<CSSProperties>(() => {
    return { width: size ?? 100, height: size ?? 100 }
  }, [size])

  return (
    <img
      className={classNames(cls.Avatar, mods, [className])}
      src={src}
      alt={alt}
      style={styles}
    />
  )
}
