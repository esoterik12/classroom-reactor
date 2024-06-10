import CourseContainer from '@/components/containers/CourseContainer'
import { fetchCourseAndModulesTitles } from '@/lib/actions/course.actions'
import React from 'react'

const SingleCoursePage = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null

  const selectedCourse = await fetchCourseAndModulesTitles(params.id)
  
  return (
    <CourseContainer
      courseId={selectedCourse._id}
      courseName={selectedCourse.courseName}
      image={selectedCourse.image}
      description={selectedCourse.description}
      createdBy={selectedCourse.createdBy}
      createdAt={selectedCourse.createdAt}
      modules={selectedCourse.modules}
    />
  )
}

export default SingleCoursePage
