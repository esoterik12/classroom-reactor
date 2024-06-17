'use client'
// Initially only for display and link purposes
import SelectIcon from '../icons/SelectIcon'
import BackButton from '../ui/BackButton'
import CourseContainerPopover from '../shared/CourseContainerPopover'
import { formatDateString } from '@/lib/utils'
import Link from 'next/link'
import NewModuleForm from '../forms/NewModule'
import { useState } from 'react'

type IModuleContainer = {
  userId: string
  courseId: string
  moduleId: string
  moduleTitle: string
  unit: number
  createdAt: string
  serializedModule: string
  parsedModule?: string
}

const ModuleContainer = ({
  userId,
  courseId,
  moduleId,
  moduleTitle,
  unit,
  createdAt,
  serializedModule,
  parsedModule
}: IModuleContainer) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  return (
    <main className='flex flex-wrap gap-6 px-2 md:px-6 py-3 mb-12'>
      {!isEdit ? (
        <div className='flex w-full flex-col justify-between rounded-md border border-grayLight-500 shadow-md dark:border-jet-500'>
          {/* Main Header Div */}
          <div className='flex h-24 w-full flex-row justify-between gap-1 rounded-md bg-grayLight-500 py-4 dark:bg-jet-500'>
            <div className='flex flex-col ml-2 gap-2'>
              <h1 className='text-xl md:text-3xl font-medium '>
                Unit {unit} - {moduleTitle}
              </h1>
              <p className='text-xs text-gray-500 hidden md:block'>
                Created: {formatDateString(createdAt)}
              </p>
            </div>
            <div className='mr-3 flex flex-row gap-2'>
              <BackButton classes='flex flex-row gap-1 text-gray-500 mb-2 mt-0.5'>
                <SelectIcon iconClasses='h-6 w-6' iconSelection='back' />
              </BackButton>
              <CourseContainerPopover buttonText='Module'>
                <div className='flex flex-col items-start gap-2 text-jet-500'>
                  {/* <Link href={`/reactor/courses/${courseId}/${moduleId}/edit`}> */}
                  <button
                    onClick={() => setIsEdit(true)}
                    className='m-1 flex flex-row gap-2'
                  >
                    <SelectIcon
                      iconClasses='h-5 w-5 mt-0.5'
                      iconSelection='edit'
                    />
                    Edit Module
                  </button>
                  {/* </Link> */}
                  <Link href={`/`}>
                    <button className='m-1 flex flex-row gap-2'>
                      <SelectIcon
                        iconClasses='h-5 w-5 mt-0.5'
                        iconSelection='x'
                      />
                      Delete
                    </button>
                  </Link>
                </div>
              </CourseContainerPopover>
            </div>
          </div>
          {/* Content Container */}
          <div className='flex flex-col gap-6 px-3'>
            <div className=''>
              {/* ADD MODULE TITLES HERE */}
              <div
                className='w-full p-4'
                dangerouslySetInnerHTML={{ __html: serializedModule }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <NewModuleForm
          userId={userId}
          courseId={courseId}
          editModuleTitle={moduleTitle}
          editModuleContent={parsedModule}
          moduleId={moduleId}
          setIsEdit={setIsEdit}
        />
      )}
    </main>
  )
}

export default ModuleContainer
