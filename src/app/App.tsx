import { useTheme } from 'app/providers/ThemeProvider'
import { Suspense, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classnames'
import {
  useAppDispatch,
  useAppSelector
} from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { getUserInited, userActions } from '../entities/User'
import { AppRouter } from './providers/router'

const App = (): JSX.Element => {
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  // получаем данные из стейта
  const mounted = useAppSelector(getUserInited)

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback=''>
        <Navbar />
        <div className='content-page'>
          <Sidebar />
          {mounted && <AppRouter />}
        </div>
      </Suspense>
    </div>
  )
}

export default App
