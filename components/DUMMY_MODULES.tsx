'use client'
import { addDummyModules } from '@/lib/actions/dummyData.actions'
import React from 'react'

const DUMMY_MODULES = ({ userId }: { userId: string }) => {
  async function addDummy() {
    addDummyModules(['B41', 'B32'], userId)
  }

  return (
    <div className='m-2 w-full rounded-lg p-2 text-center md:w-2/3'>
      <p>Use this to add dummy modules to courses.</p>
      <p>Update the fucntion with course names.</p>
      <button
        className='font-semibold text-primary-500 transition-colors duration-150 hover:text-primary-300'
        onClick={addDummy}
      >
        Add dummy modules
      </button>
    </div>
  )
}

export default DUMMY_MODULES
