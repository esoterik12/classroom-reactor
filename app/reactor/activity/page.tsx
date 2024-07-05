import React from 'react'
import { currentUser } from '@clerk/nextjs'
import PaginationButtons from '@/components/shared/PaginationButtons'
import BasicPageContainer from '@/components/containers/BasicPageContainer'
import { fetchLatestActivity } from '@/lib/actions/activity.actions'
import { formatDateString, formatTimeSince } from '@/lib/utils'
import SearchCardContainer from '@/components/containers/SearchCardContainer'
import TextLink from '@/components/ui/TextLink'

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

  const result = await fetchLatestActivity(
    searchParams.p ? +searchParams.p : 1,
    20
  )

  return (
    <BasicPageContainer>
      <>
        <div className='mb-6 w-full rounded-md bg-grayLight-500 py-4 text-center text-lg font-semibold dark:bg-jet-500'>
          Latest Creates
        </div>
        <div className='w-full p-4'>
          {result?.fetchActivityResults?.map(result => {
            if (result.hasOwnProperty('courseName')) {
              return (
                <SearchCardContainer
                  image={result.image}
                  underlineColor='text-primary-500'
                  key={result._id}
                >
                  <div className='ml-4 flex flex-row'>
                    <p>New course named&nbsp;</p>
                    <TextLink
                      className='font-bold'
                      href={`/reactor/course/${result._id}`}
                    >
                      {result.courseName}
                    </TextLink>
                    <p>&nbsp;was added.</p>
                  </div>
                  <span className='text-sm text-gray-500'>
                    {formatTimeSince(result.createdAt)}
                  </span>
                </SearchCardContainer>
              )
            }
            if (result.hasOwnProperty('authorMongoId')) {
              return (
                <SearchCardContainer
                  image={result.authorDetails.image}
                  underlineColor='text-primary-500'
                  key={result._id}
                >
                  <div className='ml-4'>
                    <TextLink
                      className='font-bold'
                      href={`/reactor/profile/${result.id}`}
                    >
                      {result.authorDetails.username}
                    </TextLink>{' '}
                    <span className='text-gray-500'>commented</span> &#x201F;
                    {result.text}&#x201D;{' '}
                    <span className='text-gray-500'>in course</span>{' '}
                    <span className='font-bold text-primary-600'>
                      {result.courseDetails.courseName}
                    </span>
                    <span className='text-gray-500'>&nbsp;discussion.</span>
                  </div>
                  <span className='text-sm text-gray-500'>
                    {formatTimeSince(result.createdAt)}
                  </span>
                </SearchCardContainer>
              )
            }
            if (result.hasOwnProperty('name')) {
              return (
                <SearchCardContainer
                  image={result.image}
                  underlineColor='text-primary-500'
                  key={result._id}
                >
                  <div className='ml-4'>
                    New user{' '}
                    <TextLink
                      className='font-bold'
                      href={`/reactor/profile/${result.id}`}
                    >
                      {result.username}
                    </TextLink>{' '}
                    joined.
                  </div>
                  <span className='text-sm text-gray-500'>
                    {formatTimeSince(result.createdAt)}
                  </span>
                </SearchCardContainer>
              )
            }
          })}
        </div>
        <PaginationButtons
          path='http://localhost:3000/reactor/activity'
          pageNumber={searchParams?.p ? +searchParams.p : 1}
          isNext={result?.isNext}
        />
      </>
    </BasicPageContainer>
  )
}

export default Page
