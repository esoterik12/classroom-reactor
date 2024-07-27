'use client'
import { addDummyCourses } from '@/lib/actions/dummyData.actions'
import React from 'react'

const DUMMY_COURSES = ({ userId }: { userId: string }) => {
  async function addDummy() {
    addDummyCourses(userId)
  }

  return (
    <div className='m-2 w-full rounded-lg p-2 text-center md:w-2/3'>
      <p>
        Use this to add a few dummy courses for working with the website if
        users deleted.
      </p>
      <p>
        Update the fucntion with new user IDs from Mongod DB if new users added
      </p>
      <button
        className='font-semibold text-primary-500 transition-colors duration-150 hover:text-primary-300'
        onClick={addDummy}
      >
        Add dummy courses
      </button>
    </div>
  )
}

export default DUMMY_COURSES
