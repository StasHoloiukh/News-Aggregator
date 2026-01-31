import {useState} from 'react'
import {useNews} from '../hooks/useNews'
import {useNewsConfig} from '../hooks/useNewsConfig'
import {ArticleList} from '../components/ArticleList'
import type {EnrichedArticle} from '../types'

export function Feed() {
  const [selectedArticle, setSelectedArticle] = useState<EnrichedArticle | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSource, setSelectedSource] = useState('')

  const {data: config, isLoading: configLoading} = useNewsConfig()
  const {data: articles = [], isLoading: articlesLoading, error} = useNews({
    q: searchQuery || undefined,
    sources: selectedSource || undefined,
    pageSize: 20,
  })

  const isLoading = configLoading || articlesLoading

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">News Aggregator</h1>
          <p className="text-gray-600 mt-1">
            Stay updated with news from {config?.sources.length || 0} sources
          </p>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b sticky top-16 z-9">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Source Filter */}
            <select
              value={selectedSource}
              onChange={e => setSelectedSource(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Sources</option>
              {config?.sources.map(source => (
                <option key={source._id} value={source.sourceId}>
                  {source.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {selectedArticle ? (
          // Detail View
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => setSelectedArticle(null)}
              className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              ← Back
            </button>

            {selectedArticle.urlToImage && (
              <div className="h-96 overflow-hidden">
                <img
                  src={selectedArticle.urlToImage}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8">
              <div className="flex gap-2 mb-4">
                <span className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded">
                  {selectedArticle.source.name}
                </span>
                {selectedArticle.topic && (
                  <span className="inline-block bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded">
                    {selectedArticle.topic}
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedArticle.title}</h1>

              <div className="flex items-center gap-4 text-gray-600 mb-6 pb-6 border-b">
                <time>
                  {new Date(selectedArticle.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {selectedArticle.author && <span>By {selectedArticle.author}</span>}
              </div>

              {selectedArticle.description && (
                <p className="text-lg text-gray-700 mb-6">{selectedArticle.description}</p>
              )}

              {selectedArticle.content && (
                <div className="text-gray-700 prose max-w-none mb-6">
                  <p>{selectedArticle.content}</p>
                </div>
              )}

              <a
                href={selectedArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-medium"
              >
                Read Full Article →
              </a>
            </div>
          </article>
        ) : (
          // List View
          <>
            <ArticleList articles={articles} onArticleClick={setSelectedArticle} isLoading={isLoading} error={error} />
          </>
        )}
      </main>
    </div>
  )
}
