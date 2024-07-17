'use client'
// Initially only for display and link purposes
import SelectIcon from '../icons/SelectIcon'
import BackButton from '../ui/BackButton'
import CourseContainerPopover from '../shared/CourseContainerPopover'
import { formatDateString } from '@/lib/utils'
import Link from 'next/link'
import NewModuleForm from '../forms/NewModule'
import { useState } from 'react'
import RemoveModule from '../ui/RemoveModule'

type IModuleContainer = {
  userMongoId: string
  permissions: 'admin' | 'manager' | 'member'
  courseId: string
  moduleId: string
  moduleTitle: string
  unit: number
  createdAt: string
  serializedModule: string
  parsedModule?: string
}

const ModuleContainer = ({
  userMongoId,
  permissions,
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
    <div className='w-full'>
      {!isEdit ? (
        <div className='flex flex-col justify-between '>
          {/* Main Header Div */}
          <div className='flex h-24 flex-row justify-between gap-1 rounded-md bg-grayLight-500 py-4 dark:bg-jet-500'>
            <div className='ml-2 flex flex-col gap-2'>
              <h1 className='text-xl font-medium md:text-3xl '>
                Unit {unit} - {moduleTitle}
              </h1>
              <p className='hidden text-xs text-gray-500 md:block'>
                Created: {formatDateString(createdAt)}
              </p>
            </div>
            <div className='mr-3 flex flex-row gap-2'>
              <BackButton classes='flex flex-row gap-1 text-gray-500 mb-2 mt-0.5'>
                <SelectIcon iconClasses='h-6 w-6' iconSelection='back' />
              </BackButton>
              <CourseContainerPopover buttonText='Module'>
                <div className='flex flex-col items-start gap-2 text-jet-500'>
                  {/* Edit Module Section */}
                  <button
                    onClick={() => setIsEdit(true)}
                    className='m-1 flex flex-row gap-2 transition-colors duration-150 hover:text-primary-300'
                  >
                    <SelectIcon
                      iconClasses='h-5 w-5 mt-0.5'
                      iconSelection='edit'
                    />
                    Edit Module
                  </button>

                  {/* Delete Module Section */}
                  <RemoveModule
                    userMongoId={userMongoId}
                    permissionDisabled={permissions !== 'admin'}
                    courseId={courseId}
                    moduleId={moduleId}
                  />
                </div>
              </CourseContainerPopover>
            </div>
          </div>
          {/* Content Container */}
          <div className='flex flex-col gap-6'>
            <div className=''>
              {/* ADD MODULE TITLES HERE */}
              <div
                className='p-4'
                dangerouslySetInnerHTML={{ __html: serializedModule }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <NewModuleForm
          userId={userMongoId}
          courseId={courseId}
          editModuleTitle={moduleTitle}
          editModuleContent={parsedModule}
          moduleId={moduleId}
          setIsEdit={setIsEdit}
        />
      )}
    </div>
  )
}

export default ModuleContainer
