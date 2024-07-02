'use client'
import { addDummyCourses } from '@/lib/actions/dummyData.actions'
import React from 'react'

const DUMMY_COURSES = ({ userId }: { userId: string }) => {
  async function addDummy() {
    addDummyCourses(userId)
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
