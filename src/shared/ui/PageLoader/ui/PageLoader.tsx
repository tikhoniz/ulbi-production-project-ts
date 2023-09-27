import { classNames } from 'shared/lib/classNames/classnames'
import { Loader } from 'shared/ui/Loader/Loader'
import cls from './PageLoader.module.scss'

interface PageLoaderProps {
  className?: string
}

export const PageLoader = ({ className }: PageLoaderProps): JSX.Element => {
  return (
    <div className={classNames(cls.PageLoader, {}, [className])}>
      <Loader />
    </div>
  )
}
