import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import repositoriesRoutes from '../../Repositories/routes/routes'
import PullRequestRoutes from '@src/modules/Pull-Requests/routes/routes'

const routes = [...sharedRoutes, ...authRoutes, ...repositoriesRoutes, ...PullRequestRoutes]

export default routes
