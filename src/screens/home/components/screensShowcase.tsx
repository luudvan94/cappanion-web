/* eslint-disable tailwindcss/no-custom-classname */
export type ScreenShowcase = {
  id: string
  title: string
  imgFileName: string
  desc: string
}

export const screensShowcase: ScreenShowcase[] = [
  {
    id: '1',
    title: 'Tracking',
    desc: 'Track your emotions, activities, and more.',
    imgFileName: 'homescreen.png'
  },
  {
    id: '2',
    title: 'Add',
    desc: 'Add a tweet, note, or anything else to your memory.',
    imgFileName: 'add_tweet.png'
  },
  {
    id: '3',
    title: 'Search',
    desc: 'Search your memories by keyword.',
    imgFileName: 'search_tweet.png'
  },
  {
    id: '4',
    title: 'Ask',
    desc: 'Ask Cappanion questions about your memories.',
    imgFileName: 'memory_search.png'
  },
  {
    id: '5',
    title: 'Summarize',
    desc: 'Summarize your memories.',
    imgFileName: 'summarize_life.png'
  },
  {
    id: '6',
    title: 'Emotional Support',
    desc: 'Get emotional support from Cappanion.',
    imgFileName: 'emotional_support.png'
  },
  {
    id: '7',
    title: 'Dark Mode',
    desc: 'Cappanion is available in dark mode.',
    imgFileName: 'dark_mode.png'
  }
]

import React, { useRef, useState } from 'react'

export const ScreensShowcase = () => {
  const [overlayImage, setOverlayImage] = useState<{
    screen: ScreenShowcase
    top: number
    left: number
  } | null>(null)
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (
    screen: ScreenShowcase,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current)
    }
    console.log('hovering')
    const rect = event.currentTarget.getBoundingClientRect()
    hoverTimeout.current = setTimeout(() => {
      console.log('setting overlay image')
      setOverlayImage({
        screen,
        top: rect.top,
        left: rect.left
      })
    }, 500) // 500ms delay
  }

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current)
      hoverTimeout.current = null
    }
    setOverlayImage(null)
  }

  return (
    <div className="flex h-full flex-col bg-black">
      <div
        className="flex h-full flex-col items-center gap-12 overflow-y-auto py-20"
        style={{ scrollPaddingTop: '1rem', scrollPaddingBottom: '1rem' }}
      >
        <div>
          <h1 className="text-center text-2xl font-bold text-white">
            Cappanion
          </h1>
          <p className="mb-4 text-center text-lg text-gray-300">
            Your personal AI companion
          </p>
        </div>
        <div className="no-scrollbar grid grow grid-cols-3 gap-36">
          {screensShowcase.map((screen) => (
            <div
              key={screen.id}
              className="screen w-48 text-center"
              onMouseEnter={(e) => handleMouseEnter(screen, e)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={`/${screen.imgFileName}`}
                alt={screen.title}
                className="scale-120 h-auto w-full"
              />
              <p className="mt-6 text-white">{screen.title}</p>
            </div>
          ))}
        </div>
      </div>
      {overlayImage && (
        <div
          className="duration-[2000ms] fixed inset-0 z-50 flex items-center justify-center gap-16 bg-black/90 transition-opacity"
          onClick={() => setOverlayImage(null)}
        >
          <div className="shrink-0">
            <img
              src={`/${overlayImage.screen.imgFileName}`}
              alt={overlayImage.screen.title}
              className="max-h-96 w-auto scale-150"
            />
          </div>
          <div className="text-left text-white">
            <h2 className="text-2xl font-bold">{overlayImage.screen.title}</h2>
            <p className="mt-2 text-lg">{overlayImage.screen.desc}</p>
          </div>
        </div>
      )}
    </div>
  )
}
