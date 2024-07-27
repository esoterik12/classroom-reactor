import Link from 'next/link'
import Image from 'next/image'
import SelectIcon from '../icons/SelectIcon'

interface CourseDashboardCardProps {
  _id: string
  image: string
  courseName: string
  numOfMembers: number
  numOfComments: number
}

function CourseDashboardCard({
  _id,
  image,
  courseName,
  numOfMembers,
  numOfComments
}: CourseDashboardCardProps) {
  return (
    <Link href={`/reactor/courses/${_id}`}>
      <article className='m-2 h-32 w-32 rounded-xl shadow-md hover:shadow-lg  dark:bg-gray-900 sm:h-36 sm:w-36'>
        <div className='h-30 flex h-full w-full flex-col justify-between'>
          <div className='rounded-tl-lg rounded-tr-lg bg-primary-100 p-2 dark:bg-secondary-300'>
            <Image
              src={image}
              alt='course image'
              width={36}
              height={36}
              className=''
            />
          </div>
          <div className='ml-4 mt-1 flex h-full flex-row gap-1'>
            <SelectIcon
              iconClasses='w-4 h-4 mt-1 text-gray-500'
              iconSelection='user'
              aria-label={`${numOfMembers} members`}
            />
            <p className='sr-only'>Number of members</p>
            <p>{numOfMembers}</p>
            <SelectIcon
              iconClasses='w-4 h-4 mt-1 text-gray-500'
              iconSelection='chat'
              aria-label={`${numOfComments} comments`}
            />
            <p className='sr-only'>Number of comments</p>
            <p>{numOfComments}</p>
          </div>
          <p className='text-md mb-2 ml-4 font-bold'>{courseName}</p>
        </div>
      </article>
    </Link>
  )
}

export default CourseDashboardCard
