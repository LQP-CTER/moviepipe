import axios from 'axios'
import type { Movie } from '../types/movie'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

export const fetchNowPlaying = async (): Promise<Movie[]> => {
  const { data } = await api.get<Movie[]>('/movies/now-playing')
  return data
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await api.get<Movie[]>('/movies/search', {
    params: { q: query },
  })
  return data
}

export const fetchTrending = async (
  window: 'day' | 'week' = 'week'
): Promise<Movie[]> => {
  const { data } = await api.get<Movie[]>('/trending', {
    params: { window },
  })
  return data
}

export const checkHealth = async (): Promise<boolean> => {
  try {
    const { data } = await api.get('/health')
    return data.status === 'ok'
  } catch {
    return false
  }
}
