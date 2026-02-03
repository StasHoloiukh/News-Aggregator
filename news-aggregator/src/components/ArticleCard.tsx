import type {EnrichedArticle} from '../types'

interface ArticleCardProps {
  article: EnrichedArticle
  onClick?: (article: EnrichedArticle) => void
}

export function ArticleCard({article, onClick}: ArticleCardProps) {
  const publishDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <article
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick?.(article)}
    >
      {article.urlToImage && (
        <div className="h-48 overflow-hidden bg-gray-200">
          <img src={article.urlToImage} alt={article.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {article.source.name}
          </span>
          {article.topic && (
            <span className="text-xs font-medium text-white bg-blue-500 px-2 py-1 rounded">
              {article.topic}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">{article.title}</h3>

        {article.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{article.description}</p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <time dateTime={article.publishedAt}>{publishDate}</time>
          {!article.isAllowed && <span className="text-red-500 font-medium">Blocked</span>}
        </div>
      </div>
    </article>
  )
}
