import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import React from 'react'

async function Page() {
  const user = await currentUser()
  if (!user) return null

  // fetch user from DB

  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>Onboarding</h1>
      <p className='text-base-regular text-light-2 mt-3'>
        Complete your profile.
      </p>

      <section className='bg-dark-2 mt-9 p-10'></section>
    </main>
  )
}

export default Page
