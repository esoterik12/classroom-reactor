import SelectIcon from '../icons/SelectIcon'
import SearchCardContainer from '../containers/SearchCardContainer'

interface ICourseCard {
  _id: string
  image: string
  courseName: string
  numOfMembers: number // temp
}

function CourseCard({ _id, image, courseName, numOfMembers }: ICourseCard) {

  return (
    <SearchCardContainer
      link={`/reactor/courses/${_id}`}
      image={image}
      underlineColor='bg-primary-100 dark:bg-primary-500'
    >
      <div className='ml-3 mt-1 flex flex-1 flex-row justify-between'>
        <div className='flex flex-col'>
          <p className='text-md font-bold'>{courseName}</p>
          <p className='text-sm mt-1'>Members: {numOfMembers}</p>
        </div>

        <div className='mt-3 flex gap-3'>
          <SelectIcon iconClasses='h-6 w-6' iconSelection='heart' />
          <SelectIcon iconClasses='h-6 w-6' iconSelection='reply' />
          <SelectIcon iconClasses='h-6 w-6' iconSelection='share' />
        </div>
      </div>
    </SearchCardContainer>
  )
}

export default CourseCard
