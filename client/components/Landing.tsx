import React from 'react'
import ReactPlayer from 'react-player'
import VimeoPlayer from '@vimeo/player'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  const [video, setVideo] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (typeof window !== undefined) {
      setVideo(true)
    }
  }, [])

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="display-flex">
      <div>
        <section
          className="relative mb-20 overflow-hidden"
          style={{
            height: `${
              windowSize.width < 775
                ? windowSize.width < 450
                  ? '70vh'
                  : '80vh'
                : '73vh'
            }`,
          }}
        >
          <div
            className="relative w-screen overflow-hidden bg-no-repeat bg-cover"
            style={{
              backgroundPosition: '50%',
              backgroundImage:
                "url('https://mdbcdn.b-cdn.net/img/new/slides/146.webp')",
              height: '100%',
            }}
          ></div>
          <div>
            {video && (
              <ReactPlayer
                url={`https://vimeo.com/${
                  windowSize.width < 775 ? '735927919' : '735927979'
                }`}
                playing={true}
                loop
                muted
                allowFullScreen
                className="absolute top-0 left-0 w-screen"
                width="100%"
                height={'120vh'}
                style={{
                  position: 'absolute',
                  top: '-25vh',
                  left: 0,
                  backgroundSize: 'cover',
                  transform:
                    windowSize.width < 1080
                      ? windowSize.width < 775
                        ? 'scale(1.2)'
                        : 'scale(1.4)'
                      : '',
                }}
                // config={{ VimeoPlayer }}
              />
            )}
          </div>
          <div>
            <div
              className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            >
              <div className="flex justify-center items-end h-full">
                <div className="text-center text-white px-6 md:px-12   h-full flex flex-col items-center justify-between pb-24 pt-20 ">
                  <h1 className=" text-2xl sm:text-4xl md:text-6xl xl:text-7xl font-bold tracking-tight ">
                    <span className="block">
                      Hello world is me, Hello world is me, Hello world is me
                    </span>
                  </h1>
                  <Link
                    type="button"
                    to="/login"
                    className=" w-64 inline-block px-7 py-3 border-2 border-white text-white font-medium text-sm leading-snug uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 735927919 for portlait */}
    </div>
  )
}

export default Landing
