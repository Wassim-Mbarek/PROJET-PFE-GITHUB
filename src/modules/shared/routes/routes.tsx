import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import repositoriesRoutes from '../../Repositories/routes/routes'
import PullRequestRoutes from '@src/modules/Pull-Requests/routes/routes'
import fileChangesRoutes from '../../File-Changes/routes/routes'

const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...repositoriesRoutes,
  ...PullRequestRoutes,
  ...fileChangesRoutes,
]

export default routes
