import React from 'react'
import { currentUser } from '@clerk/nextjs'
import PaginationButtons from '@/components/shared/PaginationButtons'
import BasicPageContainer from '@/components/containers/BasicPageContainer'
import { fetchLatestActivity } from '@/lib/actions/activity.actions'
import { formatTimeSince } from '@/lib/utils'
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

  console.log('result', result)

  return (
    <BasicPageContainer>
      <>
        <div className='w-full rounded-md bg-grayLight-500 py-4 text-center text-lg font-semibold dark:bg-jet-500'>
          Recent Activity
        </div>
        <div className='w-full p-4'>
          {result?.fetchActivityResults?.map(result => {
            // New Course Activity
            if (result.hasOwnProperty('courseName')) {
              return (
                <SearchCardContainer
                  image={result.image}
                  underlineColor='text-primary-500'
                  key={result._id}
                >
                  <p className='mx-2 flex-row flex-wrap text-sm md:text-base'>
                    <span>New course</span>
                    <TextLink
                      className='font-bold'
                      href={`/reactor/course/${result._id}`}
                    >
                      &nbsp;{result.courseName}
                    </TextLink>
                    <span>&nbsp;was added.</span>
                  </p>
                  <span className='text-right text-sm text-gray-500'>
                    {formatTimeSince(result.createdAt)}
                  </span>
                </SearchCardContainer>
              )
            }
            // New Comment Activity
            if (result.hasOwnProperty('authorMongoId')) {
              return (
                <SearchCardContainer
                  image={result.authorDetails.image}
                  underlineColor='text-primary-500'
                  key={result._id}
                >
                  <p className='mx-2 flex flex-col text-sm md:flex-row md:text-base'>
                    <TextLink
                      className='font-bold'
                      href={`/reactor/profile/${result.id}`}
                    >
                      {result.authorDetails.username}&nbsp;
                    </TextLink>
                    <div>
                      <span>posted&nbsp;</span>
                      <span>in course</span>{' '}
                      <TextLink
                        href={`/reactor/courses/${result.courseDetails._id}/discussion`}
                      >
                        <span>{result.courseDetails.courseName}</span>
                      </TextLink>
                    </div>
                  </p>
                  <span className='text-right text-sm text-gray-500'>
                    {formatTimeSince(result.createdAt)}
                  </span>
                </SearchCardContainer>
              )
            }
            // New User Activity
            if (result.hasOwnProperty('username')) {
              return (
                <SearchCardContainer
                  image={result.image}
                  underlineColor='text-primary-500'
                  key={result._id}
                >
                  <p className='mx-2 flex-row flex-wrap text-sm md:text-base'>
                    New user{' '}
                    <TextLink
                      className='font-bold'
                      href={`/reactor/profile/${result.id}`}
                    >
                      {result.username}
                    </TextLink>{' '}
                    joined.
                  </p>
                  <span className='text-right text-sm text-gray-500'>
                    {formatTimeSince(result.createdAt)}
                  </span>
                </SearchCardContainer>
              )
            }
          })}
        </div>
        <PaginationButtons
          path='/reactor/activity'
          pageNumber={searchParams?.p ? +searchParams.p : 1}
          isNext={result?.isNext}
        />
      </>
    </BasicPageContainer>
  )
}

export default Page
