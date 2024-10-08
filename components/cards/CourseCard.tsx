import SelectIcon from '../icons/SelectIcon'
import SearchCardContainer from '../containers/SearchCardContainer'
import Link from 'next/link'

interface CourseCardProps {
  _id: string
  image: string
  courseName: string
  numOfMembers: number
  numOfDissComments: number
}

function CourseCard({
  _id,
  image,
  courseName,
  numOfMembers,
  numOfDissComments
}: CourseCardProps) {
  return (
    <SearchCardContainer
      image={image}
      underlineColor='bg-primary-100 dark:bg-primary-500'
    >
      <div className='ml-3 mt-1 flex flex-1 flex-row justify-between'>
        <Link href={`/reactor/courses/${_id}`} className='w-1/2 md:w-3/4'>
          <div className='flex flex-col'>
            <p className='text-md font-bold'>{courseName}</p>
            <p className='mt-1 text-sm'>Members: {numOfMembers}</p>
          </div>
        </Link>

        <div className='mt-3 flex gap-3'>
          <SelectIcon iconClasses='h-6 w-6' iconSelection='reply' />
          <p>{numOfDissComments}</p>
        </div>
      </div>
    </SearchCardContainer>
  )
}

export default CourseCard
