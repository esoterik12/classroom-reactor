import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'
import { fetchEnrolledCourses } from '@/lib/actions/course.actions'
import CourseDashboardCard from '@/components/cards/CourseDashboardCard'
import BasicPageContainer from '@/components/containers/BasicPageContainer'

export default async function DashboardPage() {
  // Getting Clerk user data
  const user = await currentUser()
  if (!user) return null

  // // Getting DB user data
  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  const enrolledCourses = await fetchEnrolledCourses(userInfo._id)
  if (!enrolledCourses.enrolledCoursesQuery) return null

  console.log(
    'enrolledCourses in Dashboard Page',
    enrolledCourses.enrolledCoursesQuery
  )

  return (
    <BasicPageContainer>
      <>
        <div className='w-full rounded-md bg-grayLight-500 py-4 text-center text-lg font-semibold dark:bg-jet-500'>
          Dashboard Page
        </div>
        <div className='flex w-full flex-wrap items-start justify-start gap-1 p-1 sm:p-4'>
          <p className='ml-2'>
            <span className='font-semibold '>
              {userInfo.username}&apos;s&nbsp;
            </span>
            enrolled courses:
          </p>
          <div className='flex w-full flex-wrap items-start justify-start gap-1 py-2'>
            {enrolledCourses.enrolledCoursesQuery.map(course => (
              <CourseDashboardCard
                key={course._id}
                _id={course._id}
                courseName={course.courseName}
                image={course.image}
                numOfComments={course.discussion.length}
                numOfMembers={course.members.length}
              />
            ))}
          </div>
        </div>
      </>
    </BasicPageContainer>
  )
}
