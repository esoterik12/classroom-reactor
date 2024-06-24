import BasicPageContainer from '@/components/containers/BasicPageContainer'
import { fetchCourseCreates } from '@/lib/actions/course.actions'
import React from 'react'

const CourseCreatesPage = async ({ params }: { params: { id: string } }) => {
  const courseCreates = await fetchCourseCreates(params.id)

  console.log('courseCreates', courseCreates)

  return (
    <BasicPageContainer>
      <div>CourseCreatesPage</div>
    </BasicPageContainer>
  )
}

export default CourseCreatesPage
