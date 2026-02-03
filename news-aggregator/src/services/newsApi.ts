import axios from 'axios'
import type {NewsApiResponse, Article} from '../types'

const API_BASE = 'https://newsapi.org/v2'
const API_KEY = import.meta.env.VITE_NEWS_API_KEY as string

async function request<T>(url: string, params: Record<string, any> = {}): Promise<T> {
  const res = await axios.get<T>(`${API_BASE}${url}`, {
    params: {apiKey: API_KEY, ...params},
    timeout: 10000,
  })
  return res.data
}

export async function fetchTopHeadlines(options?: {
  country?: string
  category?: string
  sources?: string
  q?: string
  pageSize?: number
  page?: number
}): Promise<NewsApiResponse> {
  // If sources are specified, use /everything instead (top-headlines doesn't support sources + country)
  if (options?.sources) {
    return fetchEverything({
      sources: options.sources,
      q: options.q,
      pageSize: options.pageSize,
      page: options.page,
      sortBy: 'publishedAt',
    })
  }

  const params: Record<string, any> = {country: options?.country || 'us'}
  if (options?.category) params.category = options.category
  if (options?.q) params.q = options.q
  if (options?.pageSize) params.pageSize = options.pageSize
  if (options?.page) params.page = options.page

  return request<NewsApiResponse>('/top-headlines', params)
}

export async function fetchEverything(options?: {
  q?: string
  sources?: string
  from?: string
  to?: string
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt'
  pageSize?: number
  page?: number
}): Promise<NewsApiResponse> {
  const params: Record<string, any> = {}
  if (options?.q) params.q = options.q
  if (options?.sources) params.sources = options.sources
  if (options?.from) params.from = options.from
  if (options?.to) params.to = options.to
  if (options?.sortBy) params.sortBy = options.sortBy
  if (options?.pageSize) params.pageSize = options.pageSize
  if (options?.page) params.page = options.page

  return request<NewsApiResponse>('/everything', params)
}

export async function testFetch(): Promise<Article[]> {
  const res = await fetchTopHeadlines({pageSize: 5})
  return res.articles
}
