import axios from 'axios'
import type { Movie } from '../types/movie'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// Expanded mock data
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    overview: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    release_date: "2024-02-28",
    vote_average: 8.3,
    score_tier: "high",
    poster_url: 'https://placehold.co/500x750/1a1a23/8b5cf6?text=Dune+2',
    genre_ids: [878, 12],
    youtube_id: 'Way9Dexny3w' // Dune 2 official trailer
  },
  {
    id: 2,
    title: "Kung Fu Panda 4",
    overview: "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior.",
    release_date: "2024-03-02",
    vote_average: 7.1,
    score_tier: "mid",
    poster_url: 'https://placehold.co/500x750/1a1a23/8b5cf6?text=Kung+Fu+Panda+4',
    genre_ids: [16, 28, 10751, 35, 14],
    youtube_id: '_inKs4eeHiI'
  },
  {
    id: 3,
    title: "Godzilla x Kong: The New Empire",
    overview: "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world.",
    release_date: "2024-03-27",
    vote_average: 6.8,
    score_tier: "mid",
    poster_url: 'https://placehold.co/500x750/1a1a23/8b5cf6?text=Godzilla+x+Kong',
    genre_ids: [28, 878, 12],
    youtube_id: 'lV1OOlGwExM'
  },
  {
    id: 4,
    title: "Ghostbusters: Frozen Empire",
    overview: "When the discovery of an ancient artifact unleashes an evil force, Ghostbusters new and old must join forces to protect their home and save the world from a second Ice Age.",
    release_date: "2024-03-20",
    vote_average: 6.3,
    score_tier: "mid",
    poster_url: 'https://placehold.co/500x750/1a1a23/8b5cf6?text=Ghostbusters',
    genre_ids: [14, 12, 35],
    youtube_id: 'IwdT_6t1a6M'
  },
  {
    id: 5,
    title: "Oppenheimer",
    overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    release_date: "2023-07-19",
    vote_average: 8.1,
    score_tier: "high",
    poster_url: 'https://placehold.co/500x750/1a1a23/8b5cf6?text=Oppenheimer',
    genre_ids: [18, 36],
    youtube_id: 'uYPbbksJxIg'
  },
  {
    id: 6,
    title: "Civil War",
    overview: "A journey across a dystopian future America, following a team of military-embedded journalists as they race against time to reach DC before rebel factions descend upon the White House.",
    release_date: "2024-04-10",
    vote_average: 7.0,
    score_tier: "mid",
    poster_url: 'https://placehold.co/500x750/1a1a23/8b5cf6?text=Civil+War',
    genre_ids: [10752, 28, 53],
    youtube_id: 'aDyQZFOOFAF'
  },
  {
    id: 7,
    title: "Deadpool & Wolverine",
    overview: "A weary Wolverine finds himself recovering from his injuries when he comes across a loudmouth Deadpool who has time traveled forward to heal his greatest pals.",
    release_date: "2024-07-24",
    vote_average: 8.5,
    score_tier: "high",
    poster_url: 'https://placehold.co/500x750/1a1a23/8b5cf6?text=Deadpool+%26+Wolverine',
    genre_ids: [878, 28, 35],
    youtube_id: '73_1biulkYk'
  },
  {
    id: 8,
    title: "Furiosa: A Mad Max Saga",
    overview: "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus.",
    release_date: "2024-05-22",
    vote_average: 7.8,
    score_tier: "high",
    poster_url: 'https://placehold.co/500x750/1a1a23/8b5cf6?text=Furiosa',
    genre_ids: [28, 12, 878],
    youtube_id: 'XJMuhwVlca4'
  },
  {
    id: 9,
    title: "Inside Out 2",
    overview: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions!",
    release_date: "2024-06-12",
    vote_average: 8.0,
    score_tier: "high",
    poster_url: 'https://placehold.co/500x750/1a1a23/8b5cf6?text=Inside+Out+2',
    genre_ids: [16, 10751, 12, 35],
    youtube_id: 'LEjhY15eCx0'
  },
  {
    id: 10,
    title: "The Fall Guy",
    overview: "A battered and past-his-prime stuntman finds himself working on a movie set with the star for whom he double-crossed long ago.",
    release_date: "2024-04-24",
    vote_average: 6.9,
    score_tier: "mid",
    poster_url: 'https://placehold.co/500x750/1a1a23/8b5cf6?text=The+Fall+Guy',
    genre_ids: [28, 35],
    youtube_id: 'j7jPnwVGdCQ'
  },
  {
    id: 11,
    title: "Kingdom of the Planet of the Apes",
    overview: "Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he's been taught about the past.",
    release_date: "2024-05-08",
    vote_average: 7.2,
    score_tier: "mid",
    poster_url: 'https://placehold.co/500x750/1a1a23/8b5cf6?text=Planet+of+the+Apes',
    genre_ids: [878, 12, 28],
    youtube_id: 'XtFI7SNtVpY'
  },
  {
    id: 12,
    title: "Challengers",
    overview: "Tashi, a tennis player turned coach, has transformed her husband into a world-famous grand slam champion. To jolt him out of his recent losing streak, she makes him play a challenger event.",
    release_date: "2024-04-18",
    vote_average: 7.4,
    score_tier: "mid",
    poster_url: 'https://placehold.co/500x750/1a1a23/8b5cf6?text=Challengers',
    genre_ids: [10749, 18],
    youtube_id: 'VOUBGhZOxaI'
  }
]

export const fetchNowPlaying = async (): Promise<Movie[]> => {
  try {
    const { data } = await api.get<Movie[]>('/movies/now-playing')
    return data
  } catch (err) {
    console.warn('Backend is unreachable. Using mock data for Now Playing.')
    return mockMovies.slice(0, 6)
  }
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const { data } = await api.get<Movie[]>('/movies/search', {
      params: { q: query },
    })
    return data
  } catch (err) {
    console.warn('Backend is unreachable. Filtering mock data for Search.')
    const lowerQuery = query.toLowerCase()
    return mockMovies.filter(
      movie => 
        movie.title.toLowerCase().includes(lowerQuery) || 
        movie.overview.toLowerCase().includes(lowerQuery)
    )
  }
}

export const fetchTrending = async (
  window: 'day' | 'week' = 'week'
): Promise<Movie[]> => {
  try {
    const { data } = await api.get<Movie[]>('/trending', {
      params: { window },
    })
    return data
  } catch (err) {
    console.warn('Backend is unreachable. Using mock data for Trending.')
    // Add fake ranks for the trending movies
    return mockMovies.slice(6, 12).map((movie, index) => ({
      ...movie,
      rank: index + 1
    }))
  }
}

export const checkHealth = async (): Promise<boolean> => {
  try {
    const { data } = await api.get('/health')
    return data.status === 'ok'
  } catch {
    return false
  }
}
