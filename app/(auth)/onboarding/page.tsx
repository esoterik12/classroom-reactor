import AccountProfileForm from '@/components/forms/AccountProfile'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'

import React from 'react'

async function Page() {
  const user = await currentUser()
  if (!user) return null

  // Getting DB user data
  const userInfo = await fetchUser(user.id)

  // Creates object for Profile form
  const userData = {
    id: user.id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? '',
    bio: userInfo ? userInfo?.bio : '',
    image: userInfo ? userInfo?.image : user.imageUrl
  }

  return (
    <main className='flex flex-col justify-start px-6 py-6'>
      <div className='flex flex-row justify-center'>
        <h1 className='text-xl'>
          Complete your profile for full access to Classroom Reactor
        </h1>
      </div>
      <section className='flex flex-row '>
        <div className='mt-9 w-1/2 p-10'>
          <AccountProfileForm user={userData} />
        </div>
        <div className='container mt-9 w-1/2'>
          <div className='mt-9 px-9 py-3'>
            <h2 className='text-xl font-bold'>
              Unlock Your Learning Potential
            </h2>
            <p>
              Become a full member of Classroom Reactor and unlock all our
              resources and community features:
            </p>
            <ul className='mb-4 mt-4 list-disc pl-5'>
              <li>
                Access comprehensive course materials and content creators.
              </li>
              <li>Participate in forums and discussions.</li>
              <li>
                Create, share, and comment on content to build your learning
                network.
              </li>
              <li>Receive personalized recommendations and updates.</li>
            </ul>

            <p className='mt-3'>
              Join now and start your journey with a vibrant community of
              learners and educators dedicated to growth and excellence in
              education.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Page
