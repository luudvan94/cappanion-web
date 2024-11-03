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

import { useEffect, useRef, useState } from 'react'

export const ScreensShowcase = () => {
  const overlayImage = useRef<ScreenShowcase | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mousePosition = useRef({ x: 0, y: 0 })
  const [activeScreenId, setActiveScreenId] = useState<string | null>(null)
  const [isSingleColumn, setIsSingleColumn] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSingleColumn(window.innerWidth < 640) // Tailwind's 'sm' breakpoint
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial check

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isSingleColumn) return // Disable hover logic for single column

    const { clientX, clientY } = event
    const distance = Math.sqrt(
      Math.pow(clientX - mousePosition.current.x, 2) +
        Math.pow(clientY - mousePosition.current.y, 2)
    )

    if (distance > 50) {
      console.log('leaving overlay')
      setIsHovered(false)
    }
  }

  return (
    <div className="flex h-full flex-col bg-black animate-in fade-in-75">
      <div
        className="flex h-full flex-col items-center gap-12 overflow-y-auto py-20"
        style={{ scrollPaddingTop: '1rem', scrollPaddingBottom: '1rem' }}
      >
        <div>
          <h1 className="prose text-center text-2xl font-bold text-white">
            Cappanion
          </h1>
          <p className="mb-4 text-center text-lg text-gray-300">
            Your personal AI companion
          </p>
        </div>
        <div className="no-scrollbar grid grow grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-12 lg:gap-36">
          {screensShowcase.map((screen) => (
            <div
              key={screen.id}
              className="screen bg-red relative mx-auto w-full max-w-xs text-center"
            >
              <img
                onClick={() => {
                  setActiveScreenId(
                    screen.id === activeScreenId ? null : screen.id
                  )
                }}
                src={`/${screen.imgFileName}`}
                alt={screen.title}
                className="scale-120 h-auto w-full"
              />
              {!isSingleColumn && (
                <div
                  onMouseOver={(e) => {
                    if (isHovered) return

                    mousePosition.current = {
                      x: e.clientX,
                      y: e.clientY
                    }
                    setIsHovered(true)
                    overlayImage.current = screen
                  }}
                  onMouseLeave={() => {
                    if (!isHovered) {
                      overlayImage.current = null
                    }
                  }}
                  className="absolute inset-0 z-50 m-auto"
                  style={{
                    width: '25%',
                    height: '25%',
                    backgroundColor: 'transparent'
                  }}
                ></div>
              )}
              <p className="mt-6 text-white">{screen.title}</p>
              {activeScreenId === screen.id && isSingleColumn && (
                <p className="mt-2 text-white">{screen.desc}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      {!isSingleColumn && isHovered && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center gap-4 bg-black/90 animate-in fade-in md:gap-16"
          onMouseMove={handleMouseMove}
        >
          <div className="shrink-0">
            <img
              src={`/${overlayImage.current?.imgFileName}`}
              alt={overlayImage.current?.title}
              className="max-h-48 w-auto scale-150 md:max-h-96"
            />
          </div>
          <div className="text-left text-white">
            <h2 className="text-xl font-bold md:text-2xl">
              {overlayImage.current?.title}
            </h2>
            <p className="mt-2 text-base md:text-lg">
              {overlayImage.current?.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
