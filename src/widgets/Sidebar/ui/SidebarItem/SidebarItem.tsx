import { useTranslation } from 'react-i18next'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { type SidebarItemType } from 'widgets/Sidebar/model/items'
import cls from './SidebarItem.module.scss'
import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classnames'

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps): JSX.Element => {
  const { t } = useTranslation()
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
})
