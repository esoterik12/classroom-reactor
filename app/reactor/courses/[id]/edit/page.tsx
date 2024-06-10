import NewCourseForm from '@/components/forms/NewCourse'
import { fetchCourseAndModulesTitles } from '@/lib/actions/course.actions'

const EditCoursePage = async ({ params }: { params: { id: string } }) => {
  const selectedCourse = await fetchCourseAndModulesTitles(params.id)
  console.log('selectedCourse', selectedCourse)

  if (selectedCourse) {
    return (
      <section className='mx-6 flex flex-row items-center justify-center'>
        <div className='w-full md:w-2/3'>
          <NewCourseForm
            id={params.id}
            user={selectedCourse.createdBy._id.toString()}
            courseName={selectedCourse.courseName}
            description={selectedCourse.description}
            image={selectedCourse.image}
            createdByClerkId={selectedCourse.createdBy.id}
          />
        </div>
      </section>
    )
  } else {
    return <p>Error: Course content not found</p>
  }
}

export default EditCoursePage
