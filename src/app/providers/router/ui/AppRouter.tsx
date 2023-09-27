import { Suspense, memo, useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { useAppSelector } from 'shared/lib/hooks/reduxHooks/reduxHooks'
import { PageLoader } from 'shared/ui/PageLoader'
import { getUserAuthData } from '../../../../entities/User/model/selectors/getUserAuthData/getUserAuthData'

const AppRouter = () => {
  const isAuth = useAppSelector(getUserAuthData)

  // оборачиваем в useMemo чтобы каждый раз роуты не перерисовывались
  const routes = useMemo(
    () =>
      Object.values(routeConfig).filter(route => {
        if (route.authOnly && !isAuth) {
          return false
        }

        return true
      }),
    [isAuth]
  )

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {routes.map(({ element, path }: any) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<PageLoader />}>
                <div className='page-wrapper'>{element}</div>
              </Suspense>
            }
          />
        ))}
      </Routes>
    </Suspense>
  )
}

export default memo(AppRouter)
