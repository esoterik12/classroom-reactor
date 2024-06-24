import React from 'react'
import { fetchCreates } from '@/lib/actions/create.actions'
import CreateDisplayCard from '@/components/cards/CreateDisplayCard'
import { currentUser } from '@clerk/nextjs'
import PaginationButtons from '@/components/shared/PaginationButtons'
import BasicPageContainer from '@/components/containers/BasicPageContainer'

const Page = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const result = await fetchCreates(searchParams.p ? +searchParams.p : 1, 20) //+ for type conversion
  const user = await currentUser()

  if (!user) {
    return <p>Access Denied</p>
  }

  return (
    <BasicPageContainer>
      <>
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
        <PaginationButtons
          path='http://localhost:3000/reactor/activity'
          pageNumber={searchParams?.p ? +searchParams.p : 1}
          isNext={result.isNext}
        />
      </>
    </BasicPageContainer>
  )
}

export default Page
