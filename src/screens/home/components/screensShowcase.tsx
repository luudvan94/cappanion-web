/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useRef, useState } from 'react'
import TypeIt from 'typeit'

export type ScreenShowcase = {
  id: string
  title: string
  imgFileName: string
  desc: string
}

export const screensShowcase: ScreenShowcase[] = [
  {
    id: '1',
    title: 'Track your memories',
    desc: 'Be it a note, a thought, or anything else. Cappanion will help you remember it. We believe being able to see the progress of your memories is key to understanding yourself.',
    imgFileName: 'homescreen.png'
  },
  {
    id: '2',
    title: 'Easy to add',
    desc: 'We designed Cappanion to be easy as possible to add new memories.',
    imgFileName: 'add_tweet.png'
  },
  {
    id: '3',
    title: 'Simple search',
    desc: 'Lightning fast search for your memories. Any keyword will do. Cappanion will show you all the memories that match your query.',
    imgFileName: 'search_tweet.png'
  },
  {
    id: '4',
    title: 'Ambiguous questions',
    desc: 'Ask Cappanion questions about your memories. We will do our best to understand you.',
    imgFileName: 'memory_search.png'
  },
  {
    id: '5',
    title: 'Summarize your life',
    desc: 'Cappanion will summarize your memories for you. This is a great way to see the progress of your life.',
    imgFileName: 'summarize_life.png'
  },
  {
    id: '6',
    title: 'Emotional Support',
    desc: 'We build a profile that match your characteristics. Not only your personalities, but also goals, concerns, and more.',
    imgFileName: 'emotional_support.png'
  },
  {
    id: '7',
    title: 'Dark Mode',
    desc: 'Of course, Cappanion is available in dark mode.',
    imgFileName: 'dark_mode.png'
  }
]

export const ScreensShowcase = () => {
  const overlayImage = useRef<ScreenShowcase | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mousePosition = useRef({ x: 0, y: 0 })
  const [activeScreenId, setActiveScreenId] = useState<string | null>(null)
  const [isSingleColumn, setIsSingleColumn] = useState(false)
  const activeScreenRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsSingleColumn(window.innerWidth < 640) // Tailwind's 'sm' breakpoint
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial check

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    new TypeIt('#description', {
      speed: 50
    }).go()
  }, [])

  useEffect(() => {
    if (activeScreenRef.current && isSingleColumn) {
      activeScreenRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [activeScreenId, isSingleColumn])

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
          <h1 className="prose text-center font-mono text-4xl font-bold text-white">
            Cappanion
          </h1>
          <p
            id="description"
            className="mb-4 text-center font-mono text-lg text-gray-300"
          >
            Your personal AI companion
          </p>
          <a
            href="https://getwaitlist.com/waitlist/21845"
            className="block text-center font-mono text-lg text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join our waitlist
          </a>
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
                className="h-auto w-full"
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
              <p className="mt-6 font-mono text-white">{screen.title}</p>
              {activeScreenId === screen.id && isSingleColumn && (
                <p
                  ref={activeScreenRef}
                  className="mt-2 font-mono text-white animate-in fade-in-75"
                >
                  {screen.desc}
                </p>
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
              className="h-auto w-full scale-150 md:max-h-96"
            />
          </div>
          <div className="text-left text-white">
            <h2 className="font-mono text-xl font-bold md:text-2xl">
              {overlayImage.current?.title}
            </h2>
            <p
              id="overlay-description"
              className="mt-2 font-mono text-base md:text-lg"
              style={{
                maxWidth: '500px', // Set a fixed max width
                whiteSpace: 'normal', // Allow text to wrap
                overflowWrap: 'break-word' // Break long words
              }}
            >
              {overlayImage.current?.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
