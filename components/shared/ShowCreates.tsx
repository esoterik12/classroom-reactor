import { fetchUserCreates } from '@/lib/actions/user.actions'
import CreateDisplayCard from '../cards/CreateDisplayCard'

interface IShowCreates {
  userId: string
  username: string
  clerkUserId: string
}

const ShowCreates = async ({ userId, username, clerkUserId }: IShowCreates) => {
  const result = await fetchUserCreates(userId)
  console.log('clerkUserId', clerkUserId)
  console.log('result', result)

  return (
    <>
      <div className='mb-6 text-lg font-semibold text-gray-900'>
        {username}'s Latest Creates
      </div>
      {result.map(item => (
        <CreateDisplayCard
          key={item._id}
          _id={item._id}
          creatorUserId={item.creatorClerkId}
          creatorImage={item.creatorImage}
          currentUserId={clerkUserId}
          createType={item.createType}
          title={item.content.title}
          createdAt={item.createdAt}
        />
      ))}
    </>
  )
}

export default ShowCreates
