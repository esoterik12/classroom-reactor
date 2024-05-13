'use client'
import { addDummyUsers } from '@/lib/actions/user.actions'
import React from 'react'

type Props = {}

const DUMMY_USER = (props: Props) => {
  async function addDummy() {
    addDummyUsers()
  }

  return (
    <>
      <p>
        Use this to add a few dummy users for working with the website if users
        deleted
      </p>
      <button className='text-primary-500' onClick={addDummy}>Add dummy users</button>
    </>
  )
}

export default DUMMY_USER
