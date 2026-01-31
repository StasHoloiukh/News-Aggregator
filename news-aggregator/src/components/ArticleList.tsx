import type {EnrichedArticle} from '../types'
import {ArticleCard} from './ArticleCard'

interface ArticleListProps {
  articles: EnrichedArticle[]
  onArticleClick?: (article: EnrichedArticle) => void
  isLoading?: boolean
  error?: Error | null
}

export function ArticleList({
  articles,
  onArticleClick,
  isLoading = false,
  error = null,
}: ArticleListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <p className="font-semibold">Error loading articles</p>
        <p className="text-sm">{error.message}</p>
      </div>
    )
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No articles found</p>
      </div>
    )
  }

  // Filter allowed articles
  const allowedArticles = articles.filter(a => a.isAllowed)

  if (allowedArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No articles match your sources</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allowedArticles.map((article, idx) => (
        <ArticleCard key={`${article.url}-${idx}`} article={article} onClick={onArticleClick} />
      ))}
    </div>
  )
}
