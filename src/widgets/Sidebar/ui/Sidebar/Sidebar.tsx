import { memo, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classnames'
import { useAppSelector } from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { VerticalStack } from 'shared/ui/Stack/VerticalStack/VerticalStack'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import cls from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({ className }: SidebarProps): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false)
  // получаем данные из стейта
  const sidebarItemsList = useAppSelector(getSidebarItems)

  const onToggle = () => setCollapsed((prev) => !prev)

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem key={item.path} item={item} collapsed={collapsed} />
      )),
    [collapsed, sidebarItemsList]
  )

  return (
    <aside
      data-testid='sidebar'
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className
      ])}
    >
      <Button
        data-testid='sidebar-toggle'
        onClick={onToggle}
        className={cls.collapseBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        square
        size={ButtonSize.M}
      >
        {collapsed ? '>' : '<'}
      </Button>
      {/* для семантики изменяем обычный див на навигацию */}
      <VerticalStack role='navigation' gap='8' className={cls.items}>
        {itemsList}
      </VerticalStack>

      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </aside>
  )
})
