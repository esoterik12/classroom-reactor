import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'
import NewCourseForm from '@/components/forms/NewCourse'
import BasicPageContainer from '@/components/containers/BasicPageContainer'

async function Page() {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  return (
    <BasicPageContainer>
          <NewCourseForm user={userInfo._id} />
    </BasicPageContainer>
  )
}

export default Page
