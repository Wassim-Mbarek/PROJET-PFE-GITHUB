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
    Accept: 'application/vnd.github.v3.diff; charset=utf-8',
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

export interface Commit {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      date: string
    }
  }
  html_url: string
  author: {
    login: string
    avatar_url: string
  } | null
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

export const getPullRequestCommits = async (
  user: string,
  repo: string,
  pullNumber: number
): Promise<Commit[]> => {
  const endpoint = buildEndpoint(endpoints.getPullRequestsCommits, {
    user,
    repo,
    ref: `${pullNumber}`,
  })

  const response = await githubApi.get<Commit[]>(endpoint)
  console.log('commits', response.data)

  return response.data
}

// Get one commit details
export const getOneCommit = async (user: string, repo: string, ref: string) => {
  const endpoint = buildEndpoint(endpoints.getOneCommits, {
    user,
    repo,
    ref,
  })

  const response = await githubApi.get(endpoint)

  return response.data
}
