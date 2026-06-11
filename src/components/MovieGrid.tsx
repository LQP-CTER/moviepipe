import type { Movie } from '../types/movie'
import MovieCard from './MovieCard'

interface MovieGridProps {
  movies: Movie[]
  title?: string
  loading?: boolean
  onMovieClick?: (movie: Movie) => void
}

export default function MovieGrid({ movies, title, loading, onMovieClick }: MovieGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden bg-surface border border-white/5 animate-pulse"
          >
            <div className="aspect-[2/3] bg-white/5" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-white/10 rounded-full w-3/4" />
              <div className="h-3 bg-white/10 rounded-full w-1/2" />
              <div className="h-3 bg-white/10 rounded-full w-1/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="inline-block px-12 py-8 bg-surface border border-white/10 rounded-2xl">
          <p className="text-text-secondary text-lg">No movies found</p>
        </div>
      </div>
    )
  }

  return (
    <section className="animate-fade-in-up">
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white inline-block tracking-tight">
            {title}
          </h2>
          <div className="mt-2 h-1 w-12 bg-primary rounded-full" />
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 xl:gap-8">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} onClick={onMovieClick} />
        ))}
      </div>
    </section>
  )
}
