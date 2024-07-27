import DUMMY_COURSES from '@/components/DUMMY_COURSES'
import DUMMY_MODULES from '@/components/DUMMY_MODULES'
import DUMMY_USER from '@/components/DUMMY_USER'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'
import BasicPageContainer from '@/components/containers/BasicPageContainer'

export default async function Page() {
  // Getting Clerk user data
  const user = await currentUser()
  if (!user) return null

  // // Getting DB user data
  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')
  if (userInfo.permissions !== 'admin') redirect('/')

  return (
    <BasicPageContainer>
      <>
        <div className='w-full rounded-md bg-grayLight-500 py-4 text-center text-lg font-semibold dark:bg-jet-500'>
          Admin Page
        </div>
        <DUMMY_USER />
        <DUMMY_COURSES userId={userInfo._id.toString()} />
        <DUMMY_MODULES userId={userInfo._id.toString()} />
      </>
    </BasicPageContainer>
  )
}
