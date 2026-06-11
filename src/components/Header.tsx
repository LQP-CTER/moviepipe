import { useState } from 'react'

interface HeaderProps {
  onSearch: (query: string) => void
}

export default function Header({ onSearch }: HeaderProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleReset = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={handleReset} className="group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg group-hover:shadow-primary/30 transition-all">
                M
              </div>
              <span className="text-2xl font-bold gradient-text tracking-tight">
                MoviePipe
              </span>
            </div>
          </button>

          <form onSubmit={handleSubmit} className="flex-1 max-w-xl mx-12">
            <div className="relative group">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-text-primary placeholder-text-secondary transition-all group-hover:bg-white/10 group-hover:border-white/20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-gradient-to-r from-primary to-pink-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          <nav className="flex items-center gap-8">
            <a
              href="#now-playing"
              className="text-text-secondary hover:text-text-primary font-medium transition-colors relative group"
            >
              Now Playing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-pink-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#trending"
              className="text-text-secondary hover:text-text-primary font-medium transition-colors relative group"
            >
              Trending
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-pink-500 group-hover:w-full transition-all duration-300" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
