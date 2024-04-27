import CreateCryptogram from '@/components/forms/CreateCryptogram'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'
import CreateForm from '@/components/forms/CreateForm'
import { cryptogramSchema } from '@/lib/zod/materials.schema'

export default async function Page() {
  const user = await currentUser()
  if (!user) return null

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')
    console.log('userInfo', userInfo)

  console.log('user.id', userInfo.id)

  return (
    <main className=''>
      <CreateCryptogram userId={userInfo._id} 
       username={userInfo.username}
       userImage={userInfo.image}
      />
      {/* <CreateForm
        userId={userInfo._id.toString()}
        initialFormValues={{ title: '', text: '' }}
      /> */}
    </main>
  )
}
