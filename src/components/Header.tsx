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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 transition-all">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 gap-8">
          <button onClick={handleReset} className="group shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
                M
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                MoviePipe
              </span>
            </div>
          </button>

          <form onSubmit={handleSubmit} className="flex-1 max-w-2xl hidden md:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-text-secondary group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies, TV shows..."
                className="w-full pl-12 pr-6 py-3 bg-surface border border-white/10 rounded-full focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-text-primary placeholder-text-secondary transition-all hover:border-white/20"
              />
            </div>
          </form>

          <nav className="flex items-center gap-8 shrink-0 hidden sm:flex">
            <a
              href="#now-playing"
              className="text-text-secondary hover:text-white font-medium transition-colors relative group"
            >
              Now Playing
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#trending"
              className="text-text-secondary hover:text-white font-medium transition-colors relative group"
            >
              Trending
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
