import CourseCard from '@/components/cards/CourseCard'
import { fetchCourses } from '@/lib/actions/course.actions'
import Link from 'next/link'
import PaginationButtons from '@/components/shared/PaginationButtons'

export default async function AllCoursesPage({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const courseResult = await fetchCourses(
    searchParams.p ? +searchParams.p : 1,
    10,
    ''
  )

  return (
    <main className='flex min-h-screen flex-col items-center p-6'>
      <section className='mb-5 flex w-full flex-row justify-between'>
        <p className='mt-2 text-lg font-semibold text-gray-500'>Filter Here</p>
        <Link href='/reactor/courses/new'>
          <button className='transition-300 text-jet ml-1  rounded-md bg-secondary-500 p-2 px-4 transition-colors hover:bg-secondaryLight disabled:cursor-not-allowed dark:text-jet-500'>
            + Course
          </button>
        </Link>
      </section>
      {/* Course list with Course Card - use id to generate dynamic link */}
      <section className='flex w-full flex-row flex-wrap'>
        {courseResult.courses?.map(item => (
          <CourseCard
            key={item._id}
            courseName={item.courseName}
            _id={item._id}
            image={item.image}
            numOfMembers={item.members.length}
            numOfDissComments={item.discussion.length}
          />
        ))}
      </section>
      <PaginationButtons
        path='http://localhost:3000/reactor/courses'
        pageNumber={searchParams?.p ? +searchParams.p : 1}
        isNext={courseResult.isNext}
      />
    </main>
  )
}
