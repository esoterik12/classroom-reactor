'use client'

import { useRouter } from 'next/navigation'
import SelectIcon from '../icons/SelectIcon'

interface IPaginationButtons {
  pageNumber: number
  isNext: boolean
  path: string
}

function PaginationButtons({ pageNumber, isNext, path }: IPaginationButtons) {
  const router = useRouter()

  const handleNavigation = (type: string) => {
    let nextPageNumber = pageNumber

    if (type === 'prev') {
      nextPageNumber = Math.max(1, pageNumber - 1)
    } else if (type === 'next') {
      nextPageNumber = pageNumber + 1
    }

    if (nextPageNumber > 1) {
      router.push(`${path}?p=${nextPageNumber}`)
    } else {
      router.push(`${path}?p=1`)
    }
  }

  if (!isNext && pageNumber === 1) return null

  return (
    <div className='flex flex-row gap-5 justify-center mr-0 md:mr-10'>
      <button
        onClick={() => handleNavigation('prev')}
        disabled={pageNumber === 1}
        className='text-gray-500 disabled:hidden'
      >
        <SelectIcon iconClasses='h-6 w-6' iconSelection='back'/>
      </button>
      <p className='text-secondary-500 font-semibold'>Page {pageNumber}</p>
      <button
        onClick={() => handleNavigation('next')}
        disabled={!isNext}
        className='text-gray-500 disabled:hidden'
      >
        <SelectIcon iconClasses='h-6 w-6' iconSelection='forward'/>
      </button>
    </div>
  )
}

export default PaginationButtons
