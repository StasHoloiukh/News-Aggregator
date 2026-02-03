import type { EnrichedArticle } from '../types'

type Props = {
  articles: EnrichedArticle[]
  isLoading: boolean
  error: unknown
  onArticleClick: (article: EnrichedArticle) => void
}

export function ArticleList({
  articles,
  isLoading,
  error,
  onArticleClick,
}: Props) {
  if (isLoading) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="article-card animate-pulse">
            <div className="h-52 bg-gray-200" />
            <div className="article-card-body">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        ))}
      </>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-12">
        Failed to load articles
      </div>
    )
  }

  if (!articles.length) {
    return (
      <div className="text-gray-500 text-center py-12">
        No articles found
      </div>
    )
  }

  return (
    <>
      {articles.map(article => (
        <div
          key={article.url}
          className="article-card cursor-pointer"
          onClick={() => onArticleClick(article)}
        >
          {article.urlToImage && (
            <img src={article.urlToImage} alt={article.title} />
          )}

          <div className="article-card-body">
            <div className="article-card-tags">
              <span className="tag">{article.source.name}</span>
            </div>

            <h2 className="article-card-title">
              {article.title}
            </h2>

            {article.description && (
              <p className="article-card-description">
                {article.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </>
  )
}
