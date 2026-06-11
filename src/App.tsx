import { useState, useEffect } from 'react'
import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import MovieGrid from './components/MovieGrid'
import VideoModal from './components/VideoModal'
import { fetchNowPlaying, fetchTrending, searchMovies } from './api/movies'
import type { Movie } from './types/movie'

function App() {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([])
  const [trending, setTrending] = useState<Movie[]>([])
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

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

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-primary">
      {/* Ambient glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />

      <Header onSearch={handleSearch} />

      <main className="relative z-10 w-full">
        {!searchResults && (
          <HeroBanner 
            onPlayTrailer={() => handleMovieClick({
              id: 1,
              title: "Dune: Part Two",
              overview: "",
              release_date: "",
              vote_average: 0,
              score_tier: 'high',
              poster_url: "",
              genre_ids: [],
              youtube_id: 'Way9Dexny3w'
            })} 
          />
        )}

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24">
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
                className="px-6 py-2 glass-panel rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/10 transition-all"
              >
                Back to Home
              </button>
            </div>
            <MovieGrid movies={searchResults} loading={false} onMovieClick={handleMovieClick} />
          </div>
        ) : (
          <>
            <section id="trending" className="mb-20">
              <MovieGrid
                movies={trending}
                title="Trending This Week"
                loading={loading}
                onMovieClick={handleMovieClick}
              />
            </section>

            <section id="now-playing">
              <MovieGrid
                movies={nowPlaying}
                title="Now Playing"
                loading={loading}
                onMovieClick={handleMovieClick}
              />
            </section>
          </>
        )}
        </div>
      </main>

      {/* Modal xem video */}
      <VideoModal
        isOpen={selectedMovie !== null}
        onClose={() => setSelectedMovie(null)}
        movieTitle={selectedMovie?.title || ''}
        youtubeId={selectedMovie?.youtube_id}
      />

      <footer className="relative z-10 border-t border-white/5 mt-auto">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">
                M
              </div>
              <span className="text-xl font-bold tracking-tight text-white">MoviePipe</span>
            </div>
            <p className="text-text-secondary text-sm">
              &copy; 2026 MoviePipe. Cinematic Experience.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
