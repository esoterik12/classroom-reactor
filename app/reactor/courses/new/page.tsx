import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'
import NewCourseForm from '@/components/forms/NewCourse'

async function Page() {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  return (
    <section className='mx-6 flex flex-row items-center justify-center'>
      <div className='w-full md:w-2/3'>
        <NewCourseForm user={userInfo._id} />
      </div>
    </section>
  )
}

export default Page

