import axiosInstance from '@src/modules/auth/utils/axios'
import { endpoints } from '../../shared/store/routes/endpoints.routes'

export interface GitHubRepo {
  data?: {
    id: number
    name: string
    html_url: string
    [key: string]: any
  }[]
}

const fetchUserRepos = async (): Promise<GitHubRepo | undefined> => {
  try {
    const response = axiosInstance.get<GitHubRepo>(endpoints.getRepositories)
    return response as any
  } catch (error) {
    console.error('Error fetching repositories:', error)
  }
}

export const githubService = {
  fetchUserRepos,
}
