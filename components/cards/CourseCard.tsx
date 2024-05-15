import Image from 'next/image'
import Link from 'next/link'

interface ICourseCard {
  _id: string
  image: string
  courseName: string
}

function CourseCard({ _id, image, courseName }: ICourseCard) {
  return (
    <Link href={`courses/${_id}`} className='w-full'>
      <article className='bg-dark-2 flex w-full flex-col rounded-xl border p-2 hover:bg-primary-100'>
        {' '}
        <div className='flex items-start justify-between '>
          <div className='flex flex-1 flex-row gap-4'>
            <div className='flex flex-col items-center'>
              <Image
                src={image}
                alt='user_community_image'
                height={60}
                width={60}
                className='cursor-pointer rounded-full'
              />

              <div className='thread-card_bar' />
            </div>

            <div className='flex w-full flex-col'>
              <h4 className='cursor-pointer text-lg'>
                {courseName}
              </h4>
            </div>
          </div>
        </div>{' '}
      </article>{' '}
    </Link>
  )
}

export default CourseCard
