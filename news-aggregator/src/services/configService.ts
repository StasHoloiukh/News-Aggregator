import type {Article, EnrichedArticle, CMSConfig, NewsSource, Topic} from '../types'

/**
 * Check whether an article's source is allowed by CMS config.
 * Falls back to matching on source name when sourceId is not available.
 */
export function isSourceAllowed(
  sourceId: string | null,
  sourceName: string | null,
  allowedSources: NewsSource[]
): boolean {
  if (!allowedSources || allowedSources.length === 0) return true

  if (sourceId) {
    return allowedSources.some(s => s.sourceId === sourceId)
  }

  if (sourceName) {
    const lower = sourceName.toLowerCase()
    return allowedSources.some(s => s.name.toLowerCase() === lower)
  }

  return false
}

/**
 * Classify an article title into a topic based on CMS keywords.
 * Returns the first matching topic name or null.
 */
export function classifyArticleByTopic(title: string, topics: Topic[]): string | null {
  if (!title || !topics || topics.length === 0) return null
  const t = title.toLowerCase()

  for (const topic of topics) {
    for (const kw of topic.keywords || []) {
      if (!kw) continue
      const k = kw.toLowerCase()
      if (t.includes(k)) return topic.name
    }
  }

  return null
}

/**
 * Get topic color for UI display
 */
export function getTopicColor(topicName: string | null, topics: Topic[], fallback = '#9CA3AF'): string {
  if (!topicName) return fallback
  const topic = topics.find(t => t.name === topicName)
  return (topic && topic.color) || fallback
}

/**
 * Filter raw articles by allowed sources and enrich with classification metadata
 */
export function filterAndClassifyArticles(articles: Article[], config: CMSConfig): EnrichedArticle[] {
  const {sources = [], topics = []} = config || {sources: [], topics: []}

  return articles.map(a => {
    const sourceId = a.source?.id ?? null
    const sourceName = a.source?.name ?? null

    const allowed = isSourceAllowed(sourceId, sourceName, sources as NewsSource[])
    const topic = classifyArticleByTopic(a.title, topics as Topic[])

    return {
      ...a,
      isAllowed: allowed,
      topic,
    } as EnrichedArticle
  })
}
