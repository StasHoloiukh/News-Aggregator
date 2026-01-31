import {createClient} from '@sanity/client'
import type {NewsSource, Topic, CMSConfig} from '../types'

const client = createClient({
  projectId: (import.meta.env.VITE_SANITY_PROJECT_ID as string) || 'frbzm2pc',
  dataset: (import.meta.env.VITE_SANITY_DATASET as string) || 'production',
  useCdn: true,
  apiVersion: (import.meta.env.VITE_SANITY_API_VERSION as string) || '2024-01-01',
})

export async function fetchNewsSources(): Promise<NewsSource[]> {
  const query = `*[_type == "newsSource" && isActive == true]{_id, sourceId, name, isActive}`
  try {
    return (await client.fetch(query)) as NewsSource[]
  } catch (err) {
    console.error('fetchNewsSources error', err)
    return []
  }
}

export async function fetchTopics(): Promise<Topic[]> {
  const query = `*[_type == "topic"]{_id, name, keywords, color}`
  try {
    return (await client.fetch(query)) as Topic[]
  } catch (err) {
    console.error('fetchTopics error', err)
    return []
  }
}

export async function fetchCMSConfig(): Promise<CMSConfig> {
  const [sources, topics] = await Promise.all([fetchNewsSources(), fetchTopics()])
  return {sources, topics}
}
