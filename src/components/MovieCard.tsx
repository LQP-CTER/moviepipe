import type { Movie } from '../types/movie'
import { GENRE_MAP } from '../types/movie'

interface MovieCardProps {
  movie: Movie
  index?: number
  onClick?: (movie: Movie) => void
}

export default function MovieCard({ movie, index = 0, onClick }: MovieCardProps) {
  const tierConfig = {
    high: {
      label: 'EXCELLENT',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
    },
    mid: {
      label: 'GOOD',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      text: 'text-amber-400',
    },
    low: {
      label: 'AVERAGE',
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      text: 'text-red-400',
    },
  }

  const tier = tierConfig[movie.score_tier] || tierConfig.mid

  return (
    <div
      className="group cursor-pointer animate-fade-in-up"
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: 'both',
      }}
      onClick={() => onClick?.(movie)}
    >
      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-surface border border-white/5 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:border-white/10">
        <img
          src={movie.poster_url || 'https://placehold.co/300x450/1a1a23/8b5cf6?text=No+Poster'}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
          <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-md flex items-center justify-center text-white shadow-lg shadow-primary/40">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>

        {/* Rank Badge */}
        {movie.rank && (
          <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold shadow-lg">
            {movie.rank}
          </div>
        )}

        {/* Tier Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${tier.bg} backdrop-blur-md border ${tier.border} ${tier.text} text-[10px] font-bold tracking-widest`}>
          {tier.label}
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-white mb-2 line-clamp-1 text-lg drop-shadow-md">
            {movie.title}
          </h3>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary font-medium">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span className="text-sm font-bold text-white drop-shadow-md">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {movie.genre_ids.slice(0, 2).map((id) => (
              <span
                key={id}
                className="px-2 py-1 text-[10px] font-medium bg-white/10 text-white/80 rounded-md backdrop-blur-sm border border-white/10"
              >
                {GENRE_MAP[id] || 'Unknown'}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
