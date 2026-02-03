export interface Article {
  source: {
    id: string | null
    name: string
  }

  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

export interface EnrichedArticle extends Article {
  topic: string | null
  isAllowed: boolean
}

export interface NewsSource {
  _id: string
  sourceId: string
  name: string
  isActive: boolean
}

export interface Topic {
  _id: string
  name: string
  keywords: string[]
  color?: string
}

export interface CMSConfig {
  sources: NewsSource[]
  topics: Topic[]
}

export interface NewsApiResponse {
  status: 'ok' | 'error'
  totalResults: number
  articles: Article[]
  message?: string
}
