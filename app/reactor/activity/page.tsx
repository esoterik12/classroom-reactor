import React from 'react'
import ShowCreatesItem from '@/components/shared/ShowCreatesItem'
import { fetchCreate } from '@/lib/actions/create.actions'

const Page = async () => {
  const result = await fetchCreate()

  console.log('creates', result)

  return (
    <div className='container'>
      <div className='mb-6 text-center text-lg font-semibold text-gray-700'>
        Latest Creates
      </div>
      {result.creates.map(item => (
        <ShowCreatesItem
          key={item._id}
          createId={item._id.toString()}
          userId={item.creator}
          title={item.content.title}
          createType={item.createType}
          createdAt={item.createdAt}
          username={item.creatorUsername}
          userImage={item.creatorImage}
        />
      ))}
    </div>
  )
}

export default Page
