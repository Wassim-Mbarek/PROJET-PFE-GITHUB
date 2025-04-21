import axios from 'axios'
import { endpoints } from '../../shared/store/routes/endpoints.routes'
import { supabase } from '../../shared/utils/supabase'

export interface GitHubRepo {
  id: number
  name: string
  html_url: string
  [key: string]: any
}

const BASE_URL = 'https://api.github.com'

const fetchUserRepos = async (): Promise<GitHubRepo[]> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error || !session) {
    throw new Error('Unable to retrieve Supabase session')
  }

  const githubToken = session.provider_token

  if (!githubToken) {
    throw new Error('GitHub token not found in session')
  }

  const response = await axios.get<GitHubRepo[]>(`${BASE_URL}/${endpoints.getRepositories}`, {
    headers: {
      Authorization: `Bearer ${githubToken}`,
    },
  })

  return response.data
}

export const githubService = {
  fetchUserRepos,
}
