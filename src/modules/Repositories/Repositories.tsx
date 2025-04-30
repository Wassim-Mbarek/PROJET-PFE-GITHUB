import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import CardSkew from '../shared/components/Cards/Cards-SKEW/Card-skew'
import LoadingScreen from '../shared/components/Loading'
import NoData from '../shared/components/NoData'
import { getConnectedUser } from '../shared/utils/common'
import './_Repositories.scss'
import { githubService } from './services/Repositories.service'
import MainContainer from '../shared/layout/MainContainer/MainContainer'
import { PATH } from '../shared/routes/paths'

const connectedUserData = await getConnectedUser()

const Repositories = () => {
  const navigate = useNavigate()

  let { data, isLoading } = useQuery({
    queryKey: ['userRepos'],
    queryFn: githubService.fetchUserRepos,
    cacheTime: 1,
    enabled: true,
  })

  const handleCardClick = (userName: string, repoName: string) => {
    const url = PATH.PULL_REQUESTS.replace(':userName', userName).replace(':repoName', repoName)
    navigate(url)
  }

  const repositories = data?.data

  if (isLoading) {
    return <LoadingScreen size="full" blur />
  }

  return (
    <MainContainer
      linkProps={{
        title: 'Repositories',
        links: [{ href: '', name: 'Repositories' }],
      }}
    >
      <div className="repositories-module__card__projects__list">
        {!!repositories && repositories.length > 0 ? (
          repositories?.map((repo, index) => (
            <CardSkew
              autoColors={index + 1}
              onClick={() => handleCardClick(connectedUserData?.user_name, repo.name)}
            >
              <>
                <div className="repositories-module__card__projects__projectName">{repo.name}</div>
                <div className="repositories-module__card__projects__projectVisibility">
                  <p className="repositories-module__card__projects__projectVisibilityContent">
                    {repo.visibility}
                  </p>
                </div>
              </>
            </CardSkew>
          ))
        ) : (
          <NoData title="No Projects" />
        )}
      </div>
    </MainContainer>
  )
}

export default Repositories
