'use client'

import React, { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const VideoGrid: React.FC = () => {
  const router = useRouter()
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const videos = [
    '/videos/vid1.mp4',
    '/videos/vid2.mp4',
    '/videos/vid3.mp4',
    '/videos/vid4.mp4'
  ]

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch(error => console.log('Auto-play was prevented:', error))
      }
    })
  }, [])

  const handleVideoClick = (index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      if (video.paused) {
        video.play()
      } else {
        video.pause()
      }
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleVideoClick(index)
    }
  }

  const navigateToHome = () => {
    router.push('/')
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-r from-pink-500 to-yellow-500 animate-gradient-x flex flex-col justify-between items-center p-4">
      <h1 className="text-3xl md:text-4xl text-white font-bold text-center mb-4 bg-black bg-opacity-50 p-2 rounded-lg shadow-xl">
        My baby girl Ati Moments
      </h1>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-7xl">
        {videos.map((src, index) => (
          <div key={index} className="relative aspect-video">
            <video
              ref={(el) => {
                videoRefs.current[index] = el
              }}
              src={src}
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
              loop
              muted
              playsInline
              autoPlay
              controls
              onClick={() => handleVideoClick(index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              tabIndex={0}
              aria-label={`Video ${index + 1}. Use controls to play, pause, adjust volume, or mute.`}
            />
          </div>
        ))}
      </div>
      
      <button
        onClick={navigateToHome}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 mt-4"
        aria-label="Navigate to home page"
      >
        Ok now I feel loved
      </button>
    </div>
  )
}

export default VideoGrid