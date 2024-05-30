import SearchCardContainer from '../containers/SearchCardContainer'

interface UserCardProps {
  authUserId: string
  name: string
  username: string
  imgUrl: string
}

function UserCard({ authUserId, name, username, imgUrl }: UserCardProps) {
  return (
    <SearchCardContainer
      link={`/reactor/profile/${authUserId}`}
      image={imgUrl}
      underlineColor='bg-green-100 dark:bg-green-500'
    >
      <div className='ml-3 mt-1 flex-1'>
        <p className='text-sm text-gray-500'>{name}</p>
        <p className='text-lg font-semibold'>@{username}</p>
      </div>
    </SearchCardContainer>
  )
}

export default UserCard
