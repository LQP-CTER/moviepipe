import { useState, useEffect } from 'react'
import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import MovieGrid from './components/MovieGrid'
import Background3D from './components/Background3D'
import { fetchNowPlaying, fetchTrending, searchMovies } from './api/movies'
import type { Movie } from './types/movie'

function App() {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([])
  const [trending, setTrending] = useState<Movie[]>([])
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [nowPlayingData, trendingData] = await Promise.all([
          fetchNowPlaying(),
          fetchTrending('week'),
        ])
        setNowPlaying(nowPlayingData)
        setTrending(trendingData)
      } catch (error) {
        console.error('Failed to load movies:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null)
      return
    }

    try {
      const results = await searchMovies(query)
      setSearchResults(results)
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    }
  }

  const handleReset = () => {
    setSearchResults(null)
  }

  return (
    <div className="min-h-screen bg-bg-dark">
      <Background3D />
      <Header onSearch={handleSearch} />

      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16">
        {!searchResults && <HeroBanner />}

        {searchResults !== null ? (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold gradient-text inline-block">
                  Search Results
                </h2>
                <div className="mt-2 h-1 w-24 bg-gradient-to-r from-primary to-pink-500 rounded-full" />
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-2 glass-card rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/10 transition-all"
              >
                Back to Home
              </button>
            </div>
            <MovieGrid movies={searchResults} loading={false} />
          </div>
        ) : (
          <>
            <section id="trending" className="mb-20">
              <MovieGrid
                movies={trending}
                title="Trending This Week"
                loading={loading}
              />
            </section>

            <section id="now-playing">
              <MovieGrid
                movies={nowPlaying}
                title="Now Playing"
                loading={loading}
              />
            </section>
          </>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <span className="text-lg font-bold gradient-text">MoviePipe</span>
            </div>
            <p className="text-text-secondary text-sm">
              2026 MoviePipe. Movie data from TMDB.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
