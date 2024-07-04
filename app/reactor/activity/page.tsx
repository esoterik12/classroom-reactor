import React from 'react'
import { currentUser } from '@clerk/nextjs'
import PaginationButtons from '@/components/shared/PaginationButtons'
import BasicPageContainer from '@/components/containers/BasicPageContainer'
import { fetchLatestActivity } from '@/lib/actions/activity.actions'
import { formatDateString } from '@/lib/utils'

const Page = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const user = await currentUser()

  // UNIFINISHED: styling
  if (!user) {
    return <p>Access Denied</p>
  }

  const fetchActivityResults = await fetchLatestActivity(
    searchParams.p ? +searchParams.p : 1,
    20
  )

  console.log('fetchActivityResults in component', fetchActivityResults)

  return (
    <BasicPageContainer>
      <>
        <div className='mb-6 w-full rounded-md bg-grayLight-500 py-4 text-center text-lg font-semibold dark:bg-jet-500'>
          Latest Creates
        </div>
        <div className='w-full p-4'>
          {fetchActivityResults?.map(result => {
            if (result.hasOwnProperty('courseName')) {
              return <p className='m-2' key={result._id}>New course {result.courseName} added on {formatDateString(result.createdAt)}</p>
            }
            if (result.hasOwnProperty('authorMongoId')) {
              return <p className='m-2' key={result._id}>Comment</p>
            }
            if (result.hasOwnProperty('name')) {
              return <p className='m-2' key={result._id}>User</p>
            }
          })}

        </div>
        {/* <PaginationButtons
          path='http://localhost:3000/reactor/activity'
          pageNumber={searchParams?.p ? +searchParams.p : 1}
          isNext={result.isNext}
        /> */}
      </>
    </BasicPageContainer>
  )
}

export default Page
