'use client'

// Used for course members

import SelectIcon from '@/components/icons/SelectIcon'
import BackButton from '@/components/ui/BackButton'
import { useState } from 'react'
import Modal from './Modal'
import AddMembers from '../forms/AddMembers'


const TopRightButtons = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='mr-4 flex flex-row gap-2'>
      <BackButton classes='flex flex-row text-gray-500 hover:text-gray-200 transition-colors duration-300 mr-2 mt-1'>
        <SelectIcon iconClasses='h-6 w-6 ' iconSelection='back' />
      </BackButton>
      <button
        className='m-1 flex flex-row gap-2'
        onClick={() => setIsOpen(true)}
      >
        <SelectIcon
          iconClasses='h-6 w-6 text-secondary-800 hover:text-secondary-400 transition-colors duration-300'
          iconSelection='userPlus'
        />
      </button>

      <Modal title='New Course Members' isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <AddMembers setIsOpen={setIsOpen}/>
      </Modal>
    </div>
  )
}

export default TopRightButtons
