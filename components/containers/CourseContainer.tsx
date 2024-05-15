// Initially only for display and link purposes
import Link from 'next/link'
import SelectIcon from '../icons/SelectIcon'
import CreateCardPopover from '../shared/CreateCardPopover'
import Image from 'next/image'

type ICourseContainer = {
  _id: string
  courseName: string
  image: string
  description: string
  createdBy: ICourseCreatedBy
  createdAt: Date
  // creates
  // members
  // modules
}

type ICourseCreatedBy = {
  _id: string
  id: string
  username: string
}

const CourseContainer = ({
  _id,
  courseName,
  image,
  description,
  createdBy,
  createdAt
}: ICourseContainer) => {
  return (
    <div className='flex w-full flex-col justify-between rounded-md border border-grayLight-500 shadow-md dark:border-jet-500'>
      {/* Main Header Div */}
      <div
        className='flex h-16 w-full flex-row items-center justify-between gap-1 rounded-md bg-grayLight-500
       text-jet-500'
      >
        <div className='flew-row flex gap-2'>
          <Image src={image} width={90} height={90} alt={courseName} />
          <h1 className=' text-center text-lg font-medium '>{courseName}</h1>
        </div>
        <div className=''>
          <CreateCardPopover
            buttonText='Actions'
            title='Course Actions'
            description='xx'
            tips={['yy', 'add functions here']}
          />
        </div>
      </div>
      {/* Content Container */}
      <div className='flex flex-col gap-6 p-4 md:flex-row'>
        <div className='w-44'>
          <p className='mb-1 text-sm text-gray-700 '>Modules: </p>
          <ul className='w-44'>
            {/* ADD MODULE TITLES HERE */}
            {/* {content.map(item => (
              <li key={item.name} className='text-gray mt-1'>
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CourseContainer
