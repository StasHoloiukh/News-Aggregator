import { useState, useEffect } from 'react'
import { useNews } from '../hooks/useNews'
import { useNewsConfig } from '../hooks/useNewsConfig'
import { ArticleList } from '../components/ArticleList'
import type { EnrichedArticle } from '../types'

import './feed.css'

export function Feed() {
  const [selectedArticle, setSelectedArticle] = useState<EnrichedArticle | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSource, setSelectedSource] = useState('')
  const [sortBy, setSortBy] = useState<'relevancy' | 'popularity' | 'publishedAt'>('publishedAt')
  const [page, setPage] = useState(1)
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  // Debounce search query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
      setPage(1) // Reset page on new search
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [selectedSource, sortBy])

  const { data: config, isLoading: configLoading } = useNewsConfig()
  const { data: articles = [], isLoading: articlesLoading, error } = useNews({
    q: debouncedSearchQuery || undefined,
    sources:
      selectedSource ||
      config?.sources.map(s => s.sourceId).join(',') ||
      undefined,
    pageSize: 20,
    sortBy,
    page,
  })

  const isLoading = configLoading || articlesLoading

  return (
    <div className="feed">
      {/* ================= Header ================= */}
      <header className="feed-header">
        <div className="container">
          <h1 className="feed-title">News Aggregator</h1>
          <p className="feed-subtitle">
            Stay updated with news from {config?.sources.length || 0} sources
          </p>
        </div>
      </header>

      {/* ================= Filters ================= */}
      <div className="feed-filters">
        <div className="container filters-grid">
          <input
            className="input"
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />

          <select
            className="input"
            value={selectedSource}
            onChange={e => setSelectedSource(e.target.value)}
          >
            <option value="">All Sources</option>
            {config?.sources.map(source => (
              <option key={source._id} value={source.sourceId}>
                {source.name}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'relevancy' | 'popularity' | 'publishedAt')}
          >
            <option value="publishedAt">Newest</option>
            <option value="relevancy">Relevance</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>

      {/* ================= Main ================= */}
      <main className="container feed-main">
        {selectedArticle ? (
          <article className="article">
            <button
              className="back-button"
              onClick={() => {
                setSelectedArticle(null)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              ← Back
            </button>

            {selectedArticle.urlToImage && (
              <div className="article-image">
                <img
                  src={selectedArticle.urlToImage}
                  alt={selectedArticle.title}
                />
              </div>
            )}

            <div className="article-body">
              <div className="article-tags">
                <span className="tag">{selectedArticle.source.name}</span>
                {selectedArticle.topic && (
                  <span className="tag tag-primary">
                    {selectedArticle.topic}
                  </span>
                )}
              </div>

              <h1 className="article-title">{selectedArticle.title}</h1>

              <div className="article-meta">
                <time>
                  {new Date(selectedArticle.publishedAt).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </time>
                {selectedArticle.author && (
                  <span>By {selectedArticle.author}</span>
                )}
              </div>

              {selectedArticle.description && (
                <p className="article-description">
                  {selectedArticle.description}
                </p>
              )}

              {selectedArticle.content && (
                <div className="prose max-w-none">
                  <p>{selectedArticle.content}</p>
                </div>
              )}

              <a
                href={selectedArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more"
              >
                Read Full Article →
              </a>
            </div>
          </article>
        ) : (
          <>
            <div className="article-list article-list-grid">
              <ArticleList
                articles={articles}
                isLoading={isLoading}
                error={error}
                onArticleClick={article => {
                  setSelectedArticle(article)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              />
            </div>

            {/* Pagination Controls */}
            {!isLoading && !error && articles.length > 0 && (
              <div className="pagination">
                  <button
                        className="pagination-btn"
                        disabled={page === 1}
                        onClick={() => {
                          setPage(p => Math.max(1, p - 1))
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                      >
                        ← Previous
                      </button>

                      <div className="pagination-page">
                        <span>Page</span>
                        <span className="page-number">{page}</span>
                      </div>

                      <button
                        className="pagination-btn pagination-btn-primary"
                        disabled={articles.length < 20}
                        onClick={() => {
                          setPage(p => p + 1)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                      >
                        Next →
                      </button>
                    </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
