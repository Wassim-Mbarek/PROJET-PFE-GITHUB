import { useQuery } from 'react-query'
import commitIcon from '../shared/assets/images/commit.png'
import LoadingScreen from '../shared/components/Loading'
import './_Commits.scss'
import { Commit, getPullRequestCommits } from './services/Pull-Requests.service'
import * as dayjs from 'dayjs'
import { PATH } from '../shared/routes/paths'
import { useNavigate } from 'react-router-dom'

interface CommitProps {
  userName: string
  repoName: string
  pullNumber: number
}

export const Commits: React.FC<CommitProps> = ({ userName, repoName, pullNumber }) => {
  const { data, isLoading } = useQuery<Commit[], Error>(
    ['commits', userName, repoName, pullNumber],
    () => getPullRequestCommits(userName, repoName, pullNumber)
  )

  const navigate = useNavigate()

  const handleCommitClick = (sha: string) => {
    const url = PATH.FILE_CHANGES.replace(':userName', userName)
      .replace(':repoName', repoName)
      .replace(':sha', sha)

    navigate(url)
  }

  if (isLoading) return <LoadingScreen size="s" />

  return (
    <div className="commits-module">
      <div className="commits-module__title-container">
        <p className="commits-module__title-container__title"> Commits List : </p>
      </div>
      <ul className="commits-module__commits-container">
        {data?.map((commit) => (
          <div
            key={commit.sha}
            className="commits-module__list"
            onClick={() => handleCommitClick(commit.sha)}
            style={{ cursor: 'pointer' }}
          >
            <img className="commits-module__list__commit-avatar" src={commitIcon} />
            <p className="commits-module__list__commit-message">{commit.commit.message}</p>
            <div className="commits-module__list__commit-date">
              Created At: {dayjs(commit.commit.author.date).format('YYYY-MM-DD HH:mm:ss')}
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Commits
