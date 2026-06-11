export default function HeroBanner() {
  return (
    <div className="relative mb-16 rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-pink-500/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

      <div className="relative px-12 py-24 md:px-20 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-block mb-6 px-4 py-2 glass-card rounded-full">
            <span className="text-accent font-semibold text-sm tracking-wider uppercase">
              Discover Amazing Movies
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Your Cinema</span>
            <br />
            <span className="text-text-primary">Experience</span>
          </h1>

          <p className="text-text-secondary text-xl mb-10 max-w-2xl leading-relaxed">
            Explore trending movies, now playing films, and discover your next favorite movie with our intelligent cinema platform.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#now-playing"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-pink-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95"
            >
              <span>Now Playing</span>
              <span className="w-2 h-2 bg-white rounded-full group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#trending"
              className="group inline-flex items-center gap-3 px-8 py-4 glass-card text-text-primary font-bold rounded-2xl hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            >
              <span>Trending</span>
              <span className="w-2 h-2 bg-primary rounded-full group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="relative">
            <div className="w-64 h-96 rounded-2xl overflow-hidden glass-card animate-float shadow-2xl shadow-primary/20">
              <img
                src="https://image.tmdb.org/t/p/w500/8uVKfOJUhmyDvBdCsZLZ3xJmqa.jpg"
                alt="Featured"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-xl overflow-hidden glass-card animate-float shadow-xl" style={{ animationDelay: '0.5s' }}>
              <img
                src="https://image.tmdb.org/t/p/w500/zEqwfO5R2L0HqyW89mHRIx8VrO.jpg"
                alt="Featured 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
