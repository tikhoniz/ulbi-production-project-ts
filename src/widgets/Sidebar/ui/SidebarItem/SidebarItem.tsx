import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppSelector } from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { getUserAuthData } from '../../../../entities/User/model/selectors/getUserAuthData/getUserAuthData'
import { type SidebarItemType } from '../../model/types/sidebar'
import cls from './SidebarItem.module.scss'

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem = memo(
  ({ item, collapsed }: SidebarItemProps): JSX.Element => {
    const { t } = useTranslation()
    // получаем данные из стейта
    const isAuth = useAppSelector(getUserAuthData)

    if (item.authOnly && !isAuth) {
      return null as any
    }

    return (
      <AppLink
        theme={AppLinkTheme.SECONDARY}
        className={classNames(cls.item, { [cls.collapsed]: collapsed })}
        to={item.path}
      >
        <item.Icon className={cls.icon} />
        <span className={cls.link}>{t(item.text)}</span>
      </AppLink>
    )
  }
)
