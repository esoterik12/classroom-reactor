import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'
import NewModuleForm from '@/components/forms/NewModule'
import BasicPageContainer from '@/components/containers/BasicPageContainer'

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  return (
    <BasicPageContainer>
      <section className='w-full'>
        <div className=''>
          <NewModuleForm
            userId={userInfo._id.toString()}
            courseId={params.id}
          />
        </div>
      </section>
    </BasicPageContainer>
  )
}

export default Page
