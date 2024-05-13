'use client'
import { SetStateAction, Dispatch } from 'react'

type IActiveButtonsToggle = {
  setSearchType: Dispatch<SetStateAction<string>>
  searchType: string
}

const searchTypeArray = ['users', 'creates', 'courses']

const ActiveButtonsToggle = ({
  setSearchType,
  searchType
}: IActiveButtonsToggle) => {
  return (
    <div className='m-4 mt-6 flex items-center justify-between gap-4 rounded-full bg-primary-100 p-1 opacity-75 shadow-md'>
      {searchTypeArray.map(type => (
        <button
          className={`min-w-20 rounded-full ${searchType === type ? 'bg-primary-300 ' : ''}`}
          onClick={() => setSearchType(type)}
          key={type}
        >
          <p className='mx-2 p-0.5 text-sm font-bold capitalize text-jet-900 opacity-100'>
            {type}
          </p>
        </button>
      ))}
    </div>
  )
}

export default ActiveButtonsToggle
