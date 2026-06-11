import { useRef, useState } from 'react'
import type { Movie } from '../types/movie'
import { GENRE_MAP } from '../types/movie'

interface MovieCardProps {
  movie: Movie
  index?: number
  onClick?: (movie: Movie) => void
}

export default function MovieCard({ movie, index = 0, onClick }: MovieCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const tierConfig = {
    high: {
      label: 'EXCELLENT',
      gradient: 'from-emerald-500/20 to-emerald-600/20',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-500/20',
    },
    mid: {
      label: 'GOOD',
      gradient: 'from-amber-500/20 to-amber-600/20',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      glow: 'shadow-amber-500/20',
    },
    low: {
      label: 'AVERAGE',
      gradient: 'from-red-500/20 to-red-600/20',
      border: 'border-red-500/30',
      text: 'text-red-400',
      glow: 'shadow-red-500/20',
    },
  }

  const tier = tierConfig[movie.score_tier] || tierConfig.mid

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x: x * 20, y: y * -20 })
  }

  return (
    <div
      ref={cardRef}
      className="movie-card-3d animate-fade-in-up"
      style={{
        animationDelay: `${index * 50}ms`,
        animationFillMode: 'both',
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg) scale(1.02)`
          : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
    >
      <div 
        className={`relative rounded-2xl overflow-hidden glass-card ${tier.border} group cursor-pointer`}
        onClick={() => onClick?.(movie)}
      >
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={
              movie.poster_url ||
              'https://via.placeholder.com/300x450?text=No+Poster'
            }
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Nút Play hiển thị khi hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center text-white shadow-lg shadow-primary/50 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>

          {movie.rank && (
            <div className="absolute top-3 left-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/30">
                {movie.rank}
              </div>
            </div>
          )}

          <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full bg-gradient-to-r ${tier.gradient} ${tier.border} border ${tier.text} text-xs font-bold tracking-wider`}>
            {tier.label}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white text-sm line-clamp-3 leading-relaxed">
              {movie.overview}
            </p>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-text-primary mb-2 line-clamp-1 group-hover:text-primary transition-colors text-base">
            {movie.title}
          </h3>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm text-text-secondary">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm font-bold text-accent">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genre_ids.slice(0, 3).map((id) => (
              <span
                key={id}
                className="px-3 py-1 text-xs font-medium bg-white/5 text-text-secondary rounded-full border border-white/10 hover:border-primary/30 hover:text-primary transition-all cursor-default"
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
