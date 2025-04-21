import { endpoints } from '@src/modules/shared/store/routes/endpoints.routes'
import { supabase } from '@src/modules/shared/utils/supabase'
import axios from 'axios'

const {
  data: { session },
  error,
} = await supabase.auth.getSession()

if (error || !session) {
  throw new Error('Unable to retrieve Supabase session')
}

const githubToken = session.provider_token
console.log('session', session)

if (!githubToken) {
  throw new Error('GitHub token not found in session')
}

const githubApi = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${githubToken}`,
  },
})

export interface PullRequest {
  id: number
  number: number
  title: string
  state: string
  html_url: string
  user: {
    login: string
    avatar_url: string
  }
  created_at: string
  updated_at: string
}

const buildEndpoint = (template: string, params: Record<string, string>): string => {
  return template.replace(/:([a-zA-Z]+)/g, (_, key) => params[key])
}

export const getPullRequests = async (user: string, repo: string): Promise<PullRequest[]> => {
  const endpoint = buildEndpoint(endpoints.getPullRequests, { user, repo })
  console.log('endpoint', endpoint)

  const response = await githubApi.get<PullRequest[]>(endpoint)
  return response.data
}
