import BasicPageContainer from '@/components/containers/BasicPageContainer'
import NewCourseForm from '@/components/forms/NewCourse'
import { fetchCourseAndModulesTitles } from '@/lib/actions/course.actions'

const EditCoursePage = async ({ params }: { params: { id: string } }) => {
  const selectedCourse = await fetchCourseAndModulesTitles(params.id)
  // console.log('selectedCourse', selectedCourse)

  if (selectedCourse) {
    return (
      <BasicPageContainer>
        <NewCourseForm
          id={params.id}
          user={selectedCourse.createdBy._id.toString()}
          courseName={selectedCourse.courseName}
          description={selectedCourse.description}
          image={selectedCourse.image}
        />
      </BasicPageContainer>
    )
  } else {
    return <p>Error: Course content not found</p>
  }
}

export default EditCoursePage
