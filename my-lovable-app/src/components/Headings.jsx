// import React from 'react'

// const Headings = () => {
//   return (
//     <div className='text-center'>
//         <h1 className='font-bold text-6xl'>Build something Lovable</h1>
//         <p className='mt-3 font-light text-2xl text-gray-700 '>Bring a new product, internal tool, or entire company to life.   </p>
//     </div>
//   )
// }

// export default Headings



import React from 'react'

const Headings = () => {
  return (
    <div className='text-center max-w-3xl mx-auto px-4'>
      <h1 className='font-bold text-5xl sm:text-6xl tracking-tight text-zinc-900'>
        Build something <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">Lovable</span>
      </h1>
      <p className='mt-4 font-normal text-lg sm:text-xl text-zinc-600 leading-relaxed'>
        Bring a new product, internal tool, or entire company to life.
      </p>
    </div>
  )
}

export default Headings;