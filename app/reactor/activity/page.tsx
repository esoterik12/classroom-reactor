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

  console.log('result', result)

  return (
    <BasicPageContainer>
      <>
        <div className='mb-6 w-full rounded-md bg-grayLight-500 py-4 text-center text-lg font-semibold dark:bg-jet-500'>
          Latest Creates
        </div>
        <div className='w-full p-4'>
          {result.creates.map(item => (
            <CreateDisplayCard
              key={item._id}
              _id={item._id}
              creatorUserId={item.creator.id.toString()}
              currentUserId={user.id}
              title={item.content.title}
              createType={item.createType}
              createdAt={item.createdAt}
              username={item.creator.username}
              creatorImage={item.creator.image}
              commentNumber={item.children.length}
            />
          ))}
        </div>
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
