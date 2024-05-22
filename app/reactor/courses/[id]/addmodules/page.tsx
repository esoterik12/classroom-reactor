import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'
import NewModuleForm from '@/components/forms/NewModule'

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  const userData = {
    id: user.id,
    objectId: userInfo?._id.toString(),
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? '',
    bio: userInfo ? userInfo?.bio : '',
    image: userInfo ? userInfo?.image : user.imageUrl
  }

  return (
    <section className='mx-6 flex flex-row items-center justify-center'>
      <div className='w-full md:w-2/3'>
        <NewModuleForm user={userData} courseId={params.id} />
      </div>
    </section>
  )
}

export default Page
