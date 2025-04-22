/* eslint-disable @typescript-eslint/no-explicit-any */
import { PATH } from '@src/modules/auth/routes/paths'
import { Fragment, lazy } from 'react'
import { RouteProps } from 'react-router-dom'
import UniverseWrapper from '../layout/UniverseWrapper'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  {
    exact: true,
    path: '*',
    component: lazy(() => import('../../auth/features/Login/Login')),
    layout: (props: any) => <UniverseWrapper {...props} />,
  },
  {
    exact: true,
    path: PATH.LOGIN,
    component: lazy(() => import('../../auth/features/Login/Login')),
    layout: (props: any) => <UniverseWrapper {...props} />,
  },
  {
    exact: true,
    path: PATH.REPOSITORIES,
    component: lazy(() => import('../../Repositories/Repositories')),
    layout: (props: any) => <UniverseWrapper {...props} />,
  },
]

export default routes
