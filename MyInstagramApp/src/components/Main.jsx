"use client"
import React, { useRef } from 'react'
import Story from './Stories'
import Post from './Post'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

const Main = () => {
  const storiesRef = useRef(null);

  const scrollStories = (direction) => {
    if (!storiesRef.current) return;

    storiesRef.current.scrollBy({
      left: direction * storiesRef.current.clientWidth * 0.75,
      behavior: 'smooth',
    });
  };

  const stories = [
    // {
    //   path: "/assets/images.png",
    //   text: "Your Story"
    // },
    // {
    //   path: "/assets/images1.png",
    //   text: "John Doe"
    // },
    // {
    //   path: "/assets/images2.png",
    //   text: "Jane Smith"
    // },
    // {
    //   path: "/assets/images3.png",
    //   text: "Alex Johnson"
    // },
    // {
    //   path: "/assets/images4.png",
    //   text: "Emily Davis"
    // },
    {
      path: "/assets/images5.jpg",
      text: "Michael Brown"
    },
    {
      path: "/assets/images6.jpg",
      text: "Sarah Wilson"
    },
    {
      path: "/assets/images7.jpg",
      text: "David Lee"
    },
    {
      path: "/assets/images8.jpg",
      text: "Olivia Taylor"
    },
    {
      path: "/assets/images9.jpg",
      text: "Daniel Anderson"
    },
    {
      path: "/assets/images10.jpg",
      text: "Sophia Martinez"
    },
    {
      path: "/assets/images11.jpg",
      text: "James Thomas"
    },
    {
      path: "/assets/images12.jpg",
      text: "Ava Jackson"
    }

  ]
  return (
    <main className='h-[calc(100vh-100px)] flex flex-col items-center gap-4 overflow-y-auto scrollbar-hide'>
      <section aria-label="Stories" className="relative w-full max-w-117.5">
        <div ref={storiesRef} className="stories-scroll flex snap-x snap-mandatory items-center gap-4 overflow-x-auto rounded-lg border border-gray-300 px-4 py-2 pr-12">
          {stories.map((item) => (
            <div key={item.path} className="flex shrink-0 snap-start flex-col items-center">
              <Story path={item.path} />
              <p className="mt-1 whitespace-nowrap text-center text-xs">{item.text}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          aria-label="Scroll stories right"
          onClick={() => scrollStories(1)}
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white/95 p-2 text-gray-800 shadow-md transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
        >
          <FaChevronRight aria-hidden="true" size={14} />
        </button>
        <button
          type="button"
          aria-label="Scroll stories left"
          onClick={() => scrollStories(-1)}
          className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white/95 p-2 text-gray-800 shadow-md transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
        >
          <FaChevronLeft aria-hidden="true" size={14} />
        </button>
      </section>
      <Post />
    </main>
  )
}

export default Main;