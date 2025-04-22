import './_Pull-Requests.scss'
import { useQuery } from 'react-query'
import { getPullRequests, PullRequest } from './services/Pull-Requests.service'
import { useParams } from 'react-router-dom'
import NoData from '../shared/components/NoData'
import GlobalLayout from '../shared/components/Global Layout/Global-Layout'

const PullRequestList: React.FC = () => {
  const { userName, repoName } = useParams<{ userName: string; repoName: string }>()
  console.log('param', { userName, repoName })

  const {
    data: pullRequests,
    isLoading,
    error,
  } = useQuery<PullRequest[], Error>(
    ['pullRequests', userName, repoName],
    () => getPullRequests(userName!, repoName!),
    {
      enabled: !!userName && !!repoName,
    }
  )

  if (isLoading) return <p>Loading pull requests...</p>
  if (error) return <p>Error fetching pull requests: {error.message}</p>

  /*  return (
        <ul>
            {pullRequests?.map((pr) => (
                <li key={pr.id}>
                    <a href={pr.html_url} target="_blank" rel="noopener noreferrer">
                        #{pr.number} - {pr.title}
                    </a>
                    <p>By {pr.user.login}</p>
                </li>
            ))}
        </ul>
    ); */

  return (
    <>
      <GlobalLayout>
        <div className="pull-requests-module__card">
          <div className="pull-requests-module__card__title"> {repoName} </div>
          {pullRequests && pullRequests.length > 0 ? (
            <ul>
              {pullRequests?.map((pr) => (
                <li key={pr.id}>
                  <a href={pr.html_url} target="_blank" rel="noopener noreferrer">
                    #{pr.number} - {pr.title}
                  </a>
                  <p>By {pr.user.login}</p>
                </li>
              ))}
            </ul>
          ) : (
            <NoData title={`No Pull Requests in ${repoName}`} />
          )}
        </div>
      </GlobalLayout>
    </>
  )
}

export default PullRequestList
