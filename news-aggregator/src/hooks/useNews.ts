import {useQuery} from '@tanstack/react-query'
import {fetchTopHeadlines, fetchEverything} from '../services/newsApi'
import {filterAndClassifyArticles} from '../services/configService'
import type {EnrichedArticle, NewsApiResponse} from '../types'
import {useNewsConfig} from './useNewsConfig'

interface UseNewsOptions {
  country?: string
  category?: string
  q?: string
  sources?: string
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt'
  pageSize?: number
  page?: number
  enabled?: boolean
}

export function useNews(options: UseNewsOptions = {}) {
  const {data: config} = useNewsConfig()

  return useQuery<EnrichedArticle[]>({
    // ВАЖЛИВО: options.sortBy додано до queryKey, щоб запит оновлювався при зміні сортування
    queryKey: ['news', options.q, options.sources, options.country, options.pageSize, options.page, options.sortBy],
    queryFn: async () => {
      // Prefer fetchEverything for search, otherwise top headlines
      const response: NewsApiResponse = options.q || options.sources
        ? await fetchEverything(options)
        : await fetchTopHeadlines(options)

      if (response.status !== 'ok' || !response.articles) {
        return []
      }

      // Filter and classify using CMS config
      return config ? filterAndClassifyArticles(response.articles, config) : (response.articles as any[])
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
    enabled: options.enabled !== false && !!config,
  })
}
