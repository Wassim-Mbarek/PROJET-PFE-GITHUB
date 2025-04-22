import './_Commits.scss'
import { useQuery } from 'react-query'
import { Commit, getPullRequestCommits } from './services/Pull-Requests.service'
import { Spin } from 'antd'
import { fDateTime } from '../shared/utils/formatTime'
import commitIcon from '../shared/assets/images/commit.png'

interface CommitProps {
  userName: string
  repoName: string
  pullNumber: number
}

export const Commits: React.FC<CommitProps> = ({ userName, repoName, pullNumber }) => {
  const { data, isLoading, error } = useQuery<Commit[], Error>(
    ['commits', userName, repoName, pullNumber],
    () => getPullRequestCommits(userName, repoName, pullNumber)
  )

  if (isLoading) return <Spin size="small" />
  if (error) return <p>Error loading commits</p>

  return (
    <div className="commits-module">
      <div className="commits-module__title-container">
        <p className="commits-module__title-container__title"> Commits List : </p>
      </div>
      <ul className="commits-module__commits-container">
        {data?.map((commit) => (
          <div key={commit.sha} className="commits-module__list">
            <img className="commits-module__list__commit-avatar" src={commitIcon} />
            <p className="commits-module__list__commit-message">{commit.commit.message}</p>
            <div className="commits-module__list__commit-date">
              Created At : {fDateTime(commit.commit.author.date, 'yyyy-MM-dd HH:mm:ss')}
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}
