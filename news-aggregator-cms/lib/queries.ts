import {createClient} from '@sanity/client'

/**
 * Sanity client for frontend consumption
 * Used to fetch CMS configuration (sources, topics) dynamically
 */
export const sanityClient = createClient({
  projectId: 'frbzm2pc',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

/**
 * GROQ query to fetch all active news sources
 * Returns: {sourceId, name}
 * Used to filter which sources are allowed in the application
 */
export const SOURCES_QUERY = `
  *[_type == "newsSource" && isActive == true] {
    _id,
    sourceId,
    name
  }
`

/**
 * GROQ query to fetch all topic definitions with keywords
 * Returns: {name, keywords, color}
 * Used to classify articles by matching title against keywords
 */
export const TOPICS_QUERY = `
  *[_type == "topic"] {
    _id,
    name,
    keywords,
    color
  }
`

/**
 * Fetch all active news sources from CMS
 */
export async function fetchNewsSources() {
  try {
    return await sanityClient.fetch(SOURCES_QUERY)
  } catch (error) {
    console.error('Error fetching news sources:', error)
    return []
  }
}

/**
 * Fetch all topic definitions from CMS
 */
export async function fetchTopics() {
  try {
    return await sanityClient.fetch(TOPICS_QUERY)
  } catch (error) {
    console.error('Error fetching topics:', error)
    return []
  }
}

/**
 * Fetch both sources and topics in parallel
 * Returns: {sources, topics}
 */
export async function fetchCMSConfig() {
  try {
    const [sources, topics] = await Promise.all([
      fetchNewsSources(),
      fetchTopics(),
    ])
    return {sources, topics}
  } catch (error) {
    console.error('Error fetching CMS config:', error)
    return {sources: [], topics: []}
  }
}
