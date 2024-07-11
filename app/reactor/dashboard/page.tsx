import DUMMY_COURSES from '@/components/DUMMY_COURSES'
import DUMMY_MODULES from '@/components/DUMMY_MODULES'
import DUMMY_USER from '@/components/DUMMY_USER'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'

export default async function Page() {
  // Getting Clerk user data
  const user = await currentUser()
  if (!user) return null

  // // Getting DB user data
  const userInfo = await fetchUser(user.id)
  console.log('userInfo', userInfo)
  if (!userInfo?.onboarded) redirect('/onboarding')

  return (
    <main className='flex flex-col items-center justify-between p-6'>
      <p>Dashboard Page</p>
      <div className='m-6 border border-secondary-500 p-2'>
        <p>UNFINISHED: Permissions.</p>
        <p>UNFINISHED: Rate limits.</p>
        <p>UNFINISHED: User dashboard - add all new users to three courses.</p>
      </div>
      <DUMMY_USER />
      <DUMMY_COURSES userId={userInfo._id.toString()} />
      <DUMMY_MODULES userId={userInfo._id.toString()} />
    </main>
  )
}
