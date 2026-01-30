import {createClient} from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'frbzm2pc',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})


export const SOURCES_QUERY = `
  *[_type == "newsSource" && isActive == true] {
    _id,
    sourceId,
    name
  }
`

export const TOPICS_QUERY = `
  *[_type == "topic"] {
    _id,
    name,
    keywords,
    color
  }
`

export async function fetchNewsSources() {
  try {
    return await sanityClient.fetch(SOURCES_QUERY)
  } catch (error) {
    console.error('Error fetching news sources:', error)
    return []
  }
}

export async function fetchTopics() {
  try {
    return await sanityClient.fetch(TOPICS_QUERY)
  } catch (error) {
    console.error('Error fetching topics:', error)
    return []
  }
}

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
