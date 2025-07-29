//app/(components)/error.tsx
import React from 'react'

const Error = () => {
  const handleTryAgain = () => {
    window.location.reload();
  }

  const handleGoBack = () => {
    window.history.back();
  }

  return (
    <div className='flex flex-col gap-[3rem] items-center mt-[10rem]'>
      <h1 className='font-black text-6xl'>Oops, we have a problem!!!</h1>
      <p>There seems to be an error. Please try again or go back to the previous page.</p>
      <div className='flex gap-[10rem]'>
        <button
          onClick={handleTryAgain}
          className='bg-blue-900 p-2 text-white rounded-md'
        >
          Try Again
        </button>
        <button
          onClick={handleGoBack}
          className='bg-gray-400 p-2 rounded-md'
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default Error