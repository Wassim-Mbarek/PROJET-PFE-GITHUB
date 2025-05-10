/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthGuard from '@src/modules/shared/guards/AuthGuard'
import MainLayout from '@src/modules/shared/layout/MainLayout/MainLayout'
import { PATH } from '@src/modules/shared/routes/paths'
import { Fragment, lazy } from 'react'
import { RouteProps } from 'react-router-dom'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment | any
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  {
    exact: true,
    guard: AuthGuard,
    path: PATH.REPOSITORIES,
    component: lazy(() => import('../Repositories')),
    layout: MainLayout,
  },
]

export default routes
