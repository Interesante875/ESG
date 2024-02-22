import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RatingCard from './RatingCard' // Assume TestimonialCard is in the same directory

const rating = [
  {
    id: 1,
    author: 'Michelle',
    position: 'Designer at Apple',
    title: 'Highly accurate and professional',
    rate:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. In dictum non consectetur a erat nam at lectus urna. Dignissim convallis aenean et tortor at risus viverra adipiscing at',
    star: 5,
  },
  {
    id: 2,
    author: 'Jacky',
    position: 'CEO at Samsung',
    title: 'Highly recommend this platform',
    rate:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. In dictum non consectetur a erat nam at lectus urna. Dignissim convallis aenean et tortor at risus viverra adipiscing at.',
    star: 5,
  },
  {
    id: 3,
    author: 'Michelle',
    position: 'Designer at Apple',
    title: 'Highly accurate and professional',
    rate:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. In dictum non consectetur a erat nam at lectus urna. Dignissim convallis aenean et tortor at risus viverra adipiscing at',
    star: 5,
  },
  {
    id: 4,
    author: 'Jacky',
    position: 'CEO at Samsung',
    title: 'Highly recommend this platform',
    rate:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. In dictum non consectetur a erat nam at lectus urna. Dignissim convallis aenean et tortor at risus viverra adipiscing at.',
    star: 5,
  },
  {
    id: 5,
    author: 'Michelle',
    position: 'Designer at Apple',
    title: 'Highly accurate and professional',
    rate:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. In dictum non consectetur a erat nam at lectus urna. Dignissim convallis aenean et tortor at risus viverra adipiscing at',
    star: 5,
  },
  {
    id: 6,
    author: 'Michelle',
    position: 'Designer at Apple',
    title: 'Highly accurate and professional',
    rate:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. In dictum non consectetur a erat nam at lectus urna. Dignissim convallis aenean et tortor at risus viverra adipiscing at',
    star: 5,
  },
  {
    id: 7,
    author: 'Michelle',
    position: 'Designer at Apple',
    title: 'Highly accurate and professional',
    rate:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. In dictum non consectetur a erat nam at lectus urna. Dignissim convallis aenean et tortor at risus viverra adipiscing at',
    star: 5,
  },
  // Add more rating as needed
]

const RatingSection = () => {

  return (
    <div
      className="max-w-full min-h-30 py-8 mx-auto bg-gradient-to-b from-gray-50 content-center text-center flex flex-col"
      id="rating"
    >
      <div className="grid grid-cols-2 flex-col pl-8">
        <h1 className="flex justify-end items-end text-base text-start lg:text-end font-light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. In dictum non consectetur a erat nam at lectus urna. Dignissim convallis aenean et tortor at risus viverra adipiscing at

        </h1>

        <h1 className="text-4xl ml-4 lg:ml-8 p-2 md:p-8 flex justify-center items-center text-center">
          What do our clients say?
        </h1>
        
      </div>
      <div class="flex overflow-x-scroll py-12 no-scrollbar">
        <div class="flex flex-nowrap lg:ml-24 md:ml-12 ml-4 ">
          {rating.map((data, index) => (
        <div class="inline-block px-3">
        <RatingCard
          author={data.author}
          position={data.position}
          title={data.title}
          rate={data.rate}
          star={data.star}
        />
        </div>
      ))}
        </div>
      </div>
      </div>
  )
}

export default RatingSection
