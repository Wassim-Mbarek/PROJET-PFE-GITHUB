/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthGuard from '@src/modules/shared/guards/AuthGuard'
import GuestLayout from '@src/modules/shared/layout/GuestLayout/GuestLayout'
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
    path: PATH.PULL_REQUESTS,
    component: lazy(() => import('../Pull-Requests')),
    layout: MainLayout,
  },
]

export default routes
