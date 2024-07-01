import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'
import ProfileHeader from '@/components/shared/ProfileInfo'

export default async function Page({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: { [key: string]: string | undefined }
}) {
  // Getting Clerk user data
  const user = await currentUser()
  if (!user) return null

  // Getting DB user data
  const userInfo = await fetchUser(params.id)
  if (!userInfo?.onboarded) redirect('/onboarding')


  return (
    <main className='flex flex-col items-center justify-between p-6'>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
    </main>
  )
}
