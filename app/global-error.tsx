'use client'
import Link from "next/link"

export default function GlobalError() {
  return (
    <html>
      <body>
        <h2 className='text-xl font-bold'>Error!</h2>
        <h2 className='text-xl'>Something went wrong!</h2>
        <Link
          href='/reactor/dashboard'
          className='text-primary-500 transition-colors duration-150 hover:text-primary-200'
        >
          Return to Dashboard
        </Link>
      </body>
    </html>
  )
}
