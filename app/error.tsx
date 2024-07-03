'use client' 
import Link from 'next/link'

import { useEffect } from 'react'
 
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='flex flex-col w-full items-center mt-20'>
      <h2 className='text-xl font-bold'>Error!</h2>
      <h2 className='text-xl'>Something went wrong!</h2>
      <Link href='/reactor/dashboard' className='transition-colors duration-150 text-primary-500 hover:text-primary-200'>
        Return to Dashboard
      </Link>
    </div>
  )
}