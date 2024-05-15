'use client'
import { addDummyCourses } from '@/lib/actions/course.actions'
import React from 'react'

type Props = {}

const DUMMY_COURSES = (props: Props) => {
  async function addDummy() {
    addDummyCourses()
  }

  return (
    <>
      <p>
        Use this to add a few dummy courses for working with the website if users
        deleted.
      </p>
      <p>Update the fucntion with new user IDs from Mongod DB if new users added</p>
      <button className='text-primary-500' onClick={addDummy}>Add dummy courses</button>
    </>
  )
}

export default DUMMY_COURSES
