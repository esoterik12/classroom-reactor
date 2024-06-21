import AddComment from "@/components/forms/AddComment"
import SelectIcon from "@/components/icons/SelectIcon"
import BackButton from "@/components/ui/BackButton"
import { fetchCourseComments } from "@/lib/actions/comment.actions"
import { currentUser } from "@clerk/nextjs"
import CommentCard from "@/components/cards/CommentCard"
import { FetchedCommentProps } from "@/app/reactor/createview/cryptogram/[...id]/page"

const CourseDiscussionPage = async ({ params }: { params: { id: string } }) => {
  // const courseMembersData = await fetchCourseMembers(params.id)
  if (!params.id) return null

  const user = await currentUser()
  if (!user) return null

  console.log('user.id', user.id)

  // This page also needs to fetch course data (comments, course name)
  const courseCommentsData = await fetchCourseComments(params.id)
  console.log('courseComments in page.tsx', courseCommentsData)

  return (
    <main className='flex flex-wrap gap-6 px-6 py-3'>
      <div className='flex w-full flex-col justify-between rounded-md border border-grayLight-500 shadow-md dark:border-jet-500'>
        {/* Main Header Div */}
        <div className='flex h-16 w-full flex-row justify-between gap-1 rounded-md bg-grayLight-500 py-4 dark:bg-jet-500'>
          <p className='text-md ml-3 mt-1 text-center font-medium'>
            Course Discussion

          </p>
          {/* Add Users and Back (and possibly delete many functionality) */}
          <BackButton classes="mr-4">
            <SelectIcon iconClasses="h-6 w-6 text-gray-500" iconSelection="back" />
          </BackButton>
        </div>
        {/* Content Container */}
        <div className='flex flex-col gap-6 p-4'>
          <AddComment clerkUserId={user.id} courseId={params.id} />
          {/* ADD MODULE TITLES HERE */}
          <p>Map comments here</p>
          {courseCommentsData.discussion.map((item: FetchedCommentProps) => (
          <CommentCard
            key={item._id}
            _id={item._id}
            text={item.text}
            authorUsername={item.authorUsername}
            authorClerkId={item.authorClerkId}
            authorImage={item.authorImage}
            createdAt={item.createdAt}
          />
        ))}
        </div>
      </div>
    </main>
  )
}

export default CourseDiscussionPage
