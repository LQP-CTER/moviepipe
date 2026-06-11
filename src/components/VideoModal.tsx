import { useEffect } from 'react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  movieTitle: string
}

export default function VideoModal({ isOpen, onClose, movieTitle }: VideoModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden' // Ngăn scroll khi hiện modal
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Sử dụng một video trailer chung (Big Buck Bunny hoặc dummy YouTube video)
  // Trong thực tế, bạn sẽ lấy youtube_id từ API dựa vào movie.id
  const dummyTrailerUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in-up"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl bg-bg-dark rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 animate-slide-down">
        {/* Header Modal */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-20">
          <h3 className="text-white font-bold text-lg drop-shadow-lg truncate pr-8">
            {movieTitle} - Trailer
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-primary/80 transition-colors backdrop-blur-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Video Player */}
        <div className="relative pt-[56.25%] bg-black">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={dummyTrailerUrl}
            title={`${movieTitle} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}
