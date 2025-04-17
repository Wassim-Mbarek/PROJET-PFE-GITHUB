import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'

const routes = [...sharedRoutes, ...authRoutes]

export default routes
