import './_Pull-Requests.scss'
import { useQuery, useQueryClient } from 'react-query'
import {
  getPullRequests,
  getPullRequestCommits,
  PullRequest,
} from './services/Pull-Requests.service'
import { useParams } from 'react-router-dom'
import NoData from '../shared/components/NoData'
import GlobalLayout from '../shared/components/Global Layout/Global-Layout'
import { Collapse } from 'antd'
import { Commits } from './Commits'
import { fDateTime } from '../shared/utils/formatTime'
import verifieIcon from '../shared/assets/images/verifie.png'
import rejectedIcon from '../shared/assets/images/rejected.png'
import MergeIcon from '../shared/assets/icons/merge'

const PullRequestList: React.FC = () => {
  const { userName, repoName } = useParams<{ userName: string; repoName: string }>()
  const queryClient = useQueryClient()

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

  const handleCollapseChange = (key: string | string[]) => {
    const pullNumber = Array.isArray(key) ? key[0] : key
    if (pullNumber && userName && repoName) {
      queryClient.prefetchQuery(['commits', userName, repoName, pullNumber], () =>
        getPullRequestCommits(userName, repoName, Number(pullNumber))
      )
    }
  }

  if (isLoading) return <p>Loading pull requests...</p>
  if (error) return <p>Error fetching pull requests: {error.message}</p>

  return (
    <GlobalLayout>
      <div className="pull-requests-module__card">
        <div className="pull-requests-module__card__title">{repoName}</div>

        {pullRequests && pullRequests.length > 0 ? (
          <Collapse
            onChange={handleCollapseChange}
            items={pullRequests.map((pull) => ({
              key: `${pull.number}`,
              label: (
                <div className="pull-request-label">
                  <div className="pull-request-left-container">
                    <div className="pull-request-left-container__head">
                      <div className="pull-request-title">
                        {pull.title}
                        <div className="pull-request-merge-icon">
                          {' '}
                          <MergeIcon></MergeIcon>{' '}
                        </div>
                      </div>
                    </div>

                    <div className="pull-request-date">
                      Created At : {fDateTime(pull.created_at, 'yyyy-MM-dd HH:mm:ss')}
                    </div>
                  </div>

                  <div className="pull-request-right-container">
                    <div className="pull-request-right-container__head">
                      <img className="pull-request-user-avatar" src={pull.user?.avatar_url} />

                      <div className="pull-request-state-container">
                        <div className="pull-request-state">{pull.state}</div>

                        <img
                          className="pull-request-state__icon"
                          src={pull.state === 'open' ? verifieIcon : rejectedIcon}
                        />
                      </div>
                    </div>

                    <div className="pull-request-date">
                      Updated At : {fDateTime(pull.updated_at, 'yyyy-MM-dd HH:mm:ss')}
                    </div>
                  </div>
                </div>
              ),
              children: (
                <Commits userName={userName!} repoName={repoName!} pullNumber={pull.number} />
              ),
            }))}
          />
        ) : (
          <NoData title={`No Pull Requests in ${repoName}`} />
        )}
      </div>
    </GlobalLayout>
  )
}

export default PullRequestList
