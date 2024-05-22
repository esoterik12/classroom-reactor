import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'
import ProfileHeader from '@/components/shared/ProfileInfo'
import { fetchUserCreates } from '@/lib/actions/user.actions'
import CreateDisplayCard from '@/components/cards/CreateDisplayCard'
import PaginationButtons from '@/components/shared/PaginationButtons'

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

    console.log('userInfo', userInfo)

  const result = await fetchUserCreates({
    userId: userInfo._id,
    pageNumber: searchParams.p ? +searchParams.p : 1,
    pageSize: 20
  })

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

      <div className='mb-6 text-lg font-semibold text-gray-900'>
        {userInfo.username}'s Latest Creates
      </div>
      {result.creates.map(item => (
        <CreateDisplayCard
          key={item._id}
          _id={item._id}
          creatorUserId={item.creatorClerkId}
          creatorImage={item.creatorImage}
          currentUserId={user.id} // Clerk user id
          createType={item.createType}
          title={item.content.title}
          createdAt={item.createdAt}
        />
      ))}
      <PaginationButtons
        path={`http://localhost:3000/reactor/profile/${user.id}`}
        pageNumber={searchParams?.p ? +searchParams.p : 1}
        isNext={result.isNext}
      />
    </main>
  )
}
