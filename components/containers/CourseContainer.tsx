// Initially only for display and link purposes
import SelectIcon from '../icons/SelectIcon'
import Image from 'next/image'
import BackButton from '../ui/BackButton'
import CourseContainerPopover from '../shared/CourseContainerPopover'
import { formatDateString } from '@/lib/utils'
import Link from 'next/link'
import RemoveModule from '../ui/RemoveModule'
import DeleteCourse from '../forms/DeleteCourse'
import { ICourseContainer } from '@/lib/types'

const CourseContainer = ({
  courseId,
  courseName,
  image,
  description,
  createdBy,
  createdAt,
  modules
}: ICourseContainer) => {
  console.log('modules', modules)

  return (
    <main className='flex flex-wrap gap-6 px-2 md:px-6 py-3 mb-8 '>
      <div className='flex w-full flex-col justify-between rounded-md border border-grayLight-500 shadow-md dark:border-jet-500'>
        {/* Main Header Div */}
        <div className='flex h-16 w-full flex-row justify-between gap-1 rounded-md bg-grayLight-500 py-4 dark:bg-jet-500 md:h-32'>
          {/* Container contains responsive tailwind to hide content on sm */}
          <div className='flew-row ml-2 flex gap-2'>
            <Image
              src={image}
              width={90}
              height={90}
              alt={courseName}
              className='hidden p-2 md:block'
            />
            <div className='flex flex-col items-start'>
              <h1 className=' text-center text-xl font-medium md:text-3xl '>
                {courseName}
              </h1>
              <p className='hidden text-sm md:block'>{description}</p>
              <p className='text-xs text-gray-500 hidden md:block'>
                Created: {formatDateString(createdAt)} by{' '}
                <Link href={`/reactor/profile/${createdBy.id}`}>
                  {createdBy.username}
                </Link>
              </p>
            </div>
          </div>
          <div className='mr-3 flex flex-row gap-2'>
            <BackButton classes='flex flex-row gap-1 text-gray-500 mb-2 mt-0.5'>
              <SelectIcon iconClasses='h-6 w-6' iconSelection='back' />
            </BackButton>
            <CourseContainerPopover buttonText='Course'>
              <div className='flex flex-col items-start gap-2 text-jet-500'>
                <Link href={`/reactor/courses/${courseId}/edit`}>
                  <button className='m-1 flex flex-row gap-2'>
                    <SelectIcon
                      iconClasses='h-5 w-5 mt-0.5'
                      iconSelection='edit'
                    />
                    Edit Course
                  </button>
                </Link>

                <Link href={`/reactor/courses/${courseId}/addmodules`}>
                  <button className='m-1 flex flex-row gap-2'>
                    <SelectIcon
                      iconClasses='h-5 w-5 mt-0.5'
                      iconSelection='bars'
                    />
                    Add Module
                  </button>
                </Link>
                <Link href={`/reactor/courses/${courseId}/members`}>
                  <button className='m-1 flex flex-row gap-2'>
                    <SelectIcon
                      iconClasses='h-5 w-5 mt-0.5'
                      iconSelection='users'
                    />
                    Members
                  </button>
                </Link>
                <Link href={`/reactor/courses/${courseId}/creates`}>
                  <button className='m-1 flex flex-row gap-2'>
                    <SelectIcon
                      iconClasses='h-5 w-5 mt-0.5'
                      iconSelection='documentPlus'
                    />
                    Course Creates
                  </button>
                </Link>
                <Link href={`/reactor/courses/${courseId}/discussion`}>
                  <button className='m-1 flex flex-row gap-2'>
                    <SelectIcon
                      iconClasses='h-5 w-5 mt-0.5'
                      iconSelection='chat'
                    />
                    Discussion
                  </button>
                </Link>
                <DeleteCourse courseId={courseId.toString()} />
              </div>
            </CourseContainerPopover>
          </div>
        </div>
        {/* Content Container */}
        <div className='flex flex-col gap-6 p-4'>
          <div className=''>
            {modules.map(unit => (
              <div key={unit[0].unit} className='mt-2 p-2'>
                <p className='border-b-2 font-bold'>Unit {unit[0].unit}</p>
                {unit.map(module => (
                  <div
                    key={module._id.toString()}
                    className='text-gray mt-1 flex flex-row justify-between'
                  >
                    <Link
                      href={`/reactor/courses/${courseId}/${module._id.toString()}`}
                      className='transition-colors duration-150 hover:text-primary-200'
                    >
                      Lesson {module.lesson}: {module.moduleTitle}
                    </Link>
                    <div>
                      <CourseContainerPopover buttonText='...'>
                        <p className='text-sm text-gray-500'>
                          U{module.unit}L{module.lesson}: {module.moduleTitle}
                        </p>
                        <RemoveModule
                          moduleId={module._id.toString()}
                          courseId={courseId.toString()}
                        />
                      </CourseContainerPopover>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>{' '}
    </main>
  )
}

export default CourseContainer
