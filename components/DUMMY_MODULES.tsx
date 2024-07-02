'use client'
import { addDummyModules } from '@/lib/actions/dummyData.actions'
import React from 'react'

const DUMMY_MODULES = ({ userId }: { userId: string }) => {

  async function addDummy() {
    addDummyModules(['B41', 'B32'], userId)
  }

  return (
    <>
      <p>Use this to add dummy modules to courses.</p>
      <p>Update the fucntion with course names.</p>
      <button className='text-primary-500' onClick={addDummy}>
        Add dummy modules
      </button>
    </>
  )
}

export default DUMMY_MODULES
