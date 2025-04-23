import './_Repositories.scss'
import GlobalLayout from '../shared/components/Global Layout/Global-Layout'
import CardSkew from '../shared/components/Cards/Cards-SKEW/Card-skew'
import { githubService, GitHubRepo } from './services/Repositories.service'
import { useQuery } from 'react-query'
import NoData from '../shared/components/NoData'
import { useNavigate } from 'react-router-dom'
import { getConnectedUser } from '../shared/utils/common'
import LoadingScreen from '../shared/components/Loading'
import ScrollContainer from '../shared/components/ScrollContainer'

const connectedUserData = await getConnectedUser()

const Repositories = () => {
  const navigate = useNavigate()

  let { data, isLoading } = useQuery<GitHubRepo[]>({
    queryKey: ['userRepos'],
    queryFn: githubService.fetchUserRepos,
    cacheTime: 1,
    enabled: true,
  })

  //TESTING NO DATA
  //data= []

  //TESTING MULTIPLE PROJECTS
/*   const mockRepos: GitHubRepo[] = [
        {
          id: 101,
          name: "portfolio-website",
          html_url: "https://github.com/username/portfolio-website",
          visibility: "public",
          description: "My personal portfolio built with React and TypeScript",
          stargazers_count: 24,
          language: "TypeScript",
        },
        {
          id: 102,
          name: "todo-app",
          html_url: "https://github.com/username/todo-app",
          visibility: "public",
          description: "A simple todo app with React and Zustand",
          stargazers_count: 17,
          language: "JavaScript",
        },
        {
          id: 103,
          name: "nextjs-blog",
          html_url: "https://github.com/username/nextjs-blog",
          visibility: "private",
          description: "Blog platform using Next.js and Markdown",
          stargazers_count: 5,
          language: "JavaScript",
        },
        {
          id: 104,
          name: "github-api-wrapper",
          html_url: "https://github.com/username/github-api-wrapper",
          visibility: "public",
          description: "Custom wrapper around GitHub API using Axios",
          stargazers_count: 12,
          language: "TypeScript",
        },
        {
          id: 105,
          name: "github-api-wrapper",
          html_url: "https://github.com/username/github-api-wrapper",
          visibility: "public",
          description: "Custom wrapper around GitHub API using Axios",
          stargazers_count: 12,
          language: "TypeScript",
        },
        {
          id: 106,
          name: "github-api-wrapper",
          html_url: "https://github.com/username/github-api-wrapper",
          visibility: "public",
          description: "Custom wrapper around GitHub API using Axios",
          stargazers_count: 12,
          language: "TypeScript",
        },
        {
          id: 107,
          name: "github-api-wrapper",
          html_url: "https://github.com/username/github-api-wrapper",
          visibility: "public",
          description: "Custom wrapper around GitHub API using Axios",
          stargazers_count: 12,
          language: "TypeScript",
        },
        {
          id: 108,
          name: "github-api-wrapper",
          html_url: "https://github.com/username/github-api-wrapper",
          visibility: "public",
          description: "Custom wrapper around GitHub API using Axios",
          stargazers_count: 12,
          language: "TypeScript",
        },
      ]; */
   // data = mockRepos;

  const handleCardClick = (userName: string, repoName: string) => {
    const url = `/repositories/${userName}/${repoName}/pullRequests`
    navigate(url)
    console.log('url', url)
  }

  if (isLoading) {
    return <LoadingScreen></LoadingScreen>
  }

  return (
    <ScrollContainer>
    <div className="repositories-module">
      <GlobalLayout>
        <div className="repositories-module__card">
          <div className="repositories-module__card__title">Repositories</div>
          <div className="repositories-module__card__projects">
            <ul className="repositories-module__card__projects__list">
              {data && data.length > 0 ? (
                data.map((repo, index) => (
                  <li
                    key={repo.id}
                    onClick={() => handleCardClick(connectedUserData?.user_name, repo.name)}
                    style={{ cursor: 'pointer', listStyle: 'none' }}
                  >
                    <CardSkew autoColors={index + 1}>
                      <>
                        <div className="repositories-module__card__projects__projectName">
                          {repo.name}
                        </div>
                        <div className="repositories-module__card__projects__projectVisibility">
                          <p className="repositories-module__card__projects__projectVisibilityContent">
                            {repo.visibility}
                          </p>
                        </div>
                      </>
                    </CardSkew>
                  </li>
                ))
              ) : (
                <NoData title="No Projects" />
              )}
            </ul>
          </div>
        </div>
      </GlobalLayout>
    </div>
    </ScrollContainer>
  )
}

export default Repositories
