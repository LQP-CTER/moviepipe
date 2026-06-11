interface HeroBannerProps {
  onPlayTrailer?: () => void
}

export default function HeroBanner({ onPlayTrailer }: HeroBannerProps) {
  return (
    <div className="relative w-full h-[85vh] min-h-[600px] max-h-[900px] mb-16 overflow-hidden bg-surface">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://placehold.co/1920x1080/1a1a24/8b5cf6?text=Dune:+Part+Two"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      <div className="absolute inset-0 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-center pt-20">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-white text-sm font-medium tracking-wide uppercase">Now Streaming</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-white">
            Dune: Part Two
          </h1>

          <p className="text-text-secondary text-lg md:text-xl mb-10 max-w-2xl leading-relaxed font-light">
            Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <button 
              onClick={onPlayTrailer}
              className="flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <span>Watch Trailer</span>
            </button>
            <button className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all hover:scale-105 active:scale-95">
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
