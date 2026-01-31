import {useQuery} from '@tanstack/react-query'
import {fetchCMSConfig} from '../lib/sanity'
import type {CMSConfig} from '../types'

export function useNewsConfig() {
  return useQuery<CMSConfig>({
    queryKey: ['newsConfig'],
    queryFn: fetchCMSConfig,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  })
}
