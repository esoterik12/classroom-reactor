import CourseCard from '@/components/cards/CourseCard'
import { fetchCourses } from '@/lib/actions/course.actions'
import PaginationButtons from '@/components/shared/PaginationButtons'
import LinkButton from '@/components/ui/LinkButton'

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
        <LinkButton href='/reactor/courses/new'>
          <p>+ Course</p>
        </LinkButton>
      </section>

      {/* Course list with Course Card - Link to each course */}
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
