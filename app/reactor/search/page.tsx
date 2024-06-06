import CreateDisplayCard from '@/components/cards/CreateDisplayCard'
import ProfileHeader from '@/components/shared/ProfileInfo'
import SearchBar from '@/components/shared/SearchBar'
import { fetchCourses } from '@/lib/actions/course.actions'
import { fetchCreates } from '@/lib/actions/create.actions'
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import CourseCard from '@/components/cards/CourseCard'
import UserCard from '@/components/cards/UserCard'

async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('onboarding')

  let searchResult
  if (searchParams.type === 'users') {
    searchResult = await fetchUsers({
      userId: user.id,
      searchString: searchParams.q,
      searchType: searchParams.type,
      pageNumber: searchParams?.page ? +searchParams.page : 1,
      pageSize: 20
    })
  }

  let searchCreatesResult
  if (searchParams.type === 'creates') {
    searchCreatesResult = await fetchCreates(1, 20, searchParams.q)
  }

  let searchCousesResult
  if (searchParams.type === 'courses') {
    searchCousesResult = await fetchCourses(1, 20, searchParams.q)
  }

  return (
    <section className='container mb-28 flex flex-col items-center md:mb-12'>
      <div className='text-center text-lg font-semibold text-gray-700 dark:text-offWhite-500'>
        Search Classroom Reactor
      </div>
      <div>
        <SearchBar inputClasses='' />
      </div>
      <div className='mt-4 w-full'>
        {/* Conditionally display users with ProfileHeader component */}
        {searchParams.type === 'users' && searchResult?.users.length === 0 ? (
          <p className='text-center text-gray-700'>No Results</p>
        ) : (
          <>
            {searchResult?.users.map(user => (
              <div key={user._id} className=''>
                <UserCard
                  authUserId={user.id}
                  name={user.name}
                  username={user.username}
                  imgUrl={user.image}
                />
              </div>
            ))}
          </>
        )}
        {/* Conditionally display creates with CreateDisplayCard component */}
        {searchParams.type === 'creates' &&
        searchCreatesResult?.creates.length === 0 ? (
          <p className='text-center text-gray-700'>No Results</p>
        ) : (
          <>
            {searchCreatesResult?.creates.map(create => (
              <div key={create._id} className=''>
                <CreateDisplayCard
                  _id={create._id}
                  // not using currentUserId?
                  creatorUserId={create.creatorClerkId}
                  creatorImage={create.creatorImage}
                  createType={create.createType}
                  createdAt={create.createdAt}
                  title={create.content.title}
                  username={create.creatorUsername}
                />
              </div>
            ))}
          </>
        )}
        {/* Conditionally display creates with CreateDisplayCard component */}
        {searchParams.type === 'courses' &&
        searchCousesResult?.courses.length === 0 ? (
          <p className='text-center text-gray-700'>No Results</p>
        ) : (
          <>
            {searchCousesResult?.courses.map(course => (
              <div key={course._id} className=''>
                <CourseCard
                  key={course._id}
                  courseName={course.courseName}
                  _id={course._id}
                  image={course.image}
                  numOfMembers={course.members.length}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  )
}

export default Page
