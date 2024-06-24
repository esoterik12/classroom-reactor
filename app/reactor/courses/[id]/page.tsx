import BasicPageContainer from '@/components/containers/BasicPageContainer'
import CourseContainer from '@/components/containers/CourseContainer'
import { fetchCourseAndModulesTitles } from '@/lib/actions/course.actions'
import React from 'react'

const SingleCoursePage = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null

  const fetchedCourse = await fetchCourseAndModulesTitles(params.id)

  if (!fetchedCourse) return <p>Error loading course details</p>

  return (
    <BasicPageContainer>
      <CourseContainer
        courseId={fetchedCourse.courseId.toString()}
        courseName={fetchedCourse.courseName}
        image={fetchedCourse.image}
        description={fetchedCourse.description}
        createdBy={fetchedCourse.createdBy}
        createdAt={fetchedCourse.createdAt}
        modules={fetchedCourse.modules}
      />
    </BasicPageContainer>
  )
}

export default SingleCoursePage
