import TopRightButtons from '@/components/ui/TopRightButtons'
import { fetchCourseMembers } from '@/lib/actions/course.actions'
import { ICourseMembersData } from '@/lib/types'
import ProfileHeader from '@/components/shared/ProfileInfo'
import Link from 'next/link'
import CourseContainerPopover from '@/components/shared/CourseContainerPopover'
import SelectIcon from '@/components/icons/SelectIcon'
import RemoveCourseUser from '@/components/ui/RemoveCourseUser'
import BasicPageContainer from '@/components/containers/BasicPageContainer'
import ChangeCourseRole from '@/components/ui/ChangeCourseRole'

const CourseMembersPage = async ({ params }: { params: { id: string } }) => {
  const courseMembersData = await fetchCourseMembers(params.id)

  return (
    <BasicPageContainer>
      <div className='flex w-full flex-col justify-between'>
        {/* Main Header Div */}
        <div className='flex h-16 w-full flex-row justify-between gap-1 rounded-md bg-grayLight-500 py-4 dark:bg-jet-500'>
          <p className='text-md ml-3 mt-1 text-center font-medium'>
            {courseMembersData.courseName} - Members:{' '}
            {courseMembersData.members.length}
          </p>
          {/* Add Users and Back (and possibly delete many functionality) */}
          <TopRightButtons />
        </div>
        {/* Content Container */}
        <div className='flex flex-col gap-6 p-4'>
          {/* ADD MODULE TITLES HERE */}
          {courseMembersData.members.map((member: ICourseMembersData) => (
            <div
              key={member.user._id}
              className='flex flex-row items-start justify-between rounded-lg p-2 shadow'
            >
              <Link href={`/reactor/profile/${member.user.id}`}>
                <ProfileHeader
                  accountId={member.user._id}
                  authUserId={member.user.id}
                  name={member.user.name}
                  username={member.user.username}
                  imgUrl={member.user.image}
                  type='Search'
                />
              </Link>
              <div className='flex flex-row items-end justify-start gap-1'>
                <p className='rounded-md py-1 text-sm capitalize text-gray-500'>
                  {member.role}
                </p>
                <CourseContainerPopover buttonText='Edit'>
                  <p className='text-sm text-gray-500'>
                    @{member.user.username}
                  </p>
                  <ChangeCourseRole
                    userId={member.user._id.toString()}
                    courseId={params.id.toString()}
                  />
                  <RemoveCourseUser
                    userId={member.user._id.toString()}
                    courseId={params.id.toString()}
                  />
                </CourseContainerPopover>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BasicPageContainer>
  )
}

export default CourseMembersPage
