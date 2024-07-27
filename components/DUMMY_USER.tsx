'use client'
import { addDummyUsers } from '@/lib/actions/dummyData.actions'
import React from 'react'

type Props = {}

const DUMMY_USER = (props: Props) => {
  async function addDummy() {
    addDummyUsers()
  }

  return (
    <div className='m-2 w-full rounded-lg p-2 text-center md:w-2/3'>
      <p>
        Use this to add a few dummy users for working with the website if users
        deleted:
      </p>
      <button
        className='font-semibold text-primary-500 transition-colors duration-150 hover:text-primary-300'
        onClick={addDummy}
      >
        Add dummy users
      </button>
    </div>
  )
}

export default DUMMY_USER
