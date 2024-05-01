import React from 'react'
import { fetchCreate } from '@/lib/actions/create.actions'
import CreateDisplayCard from '@/components/cards/CreateDisplayCard'
import { currentUser } from '@clerk/nextjs'

const Page = async () => {
  const result = await fetchCreate()
  const user = await currentUser()

  if (!user) {
    return <p>Access Denied</p>
  }

  return (
    <div className='container'>
      <div className='mb-6 text-center text-lg font-semibold text-gray-700'>
        Latest Creates
      </div>
      {result.creates.map(item => (
        <CreateDisplayCard
          key={item._id}
          _id={item._id}
          creatorUserId={item.creator.id.toString()}
          currentUserId={user.id} 
          title={item.content.title}
          createType={item.createType}
          createdAt={item.createdAt}
          username={item.creatorUsername}
          creatorImage={item.creatorImage}
        />
      ))}
    </div>
  )
}

export default Page
