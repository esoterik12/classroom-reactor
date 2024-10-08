'use client'
import { Popover, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

interface ICreateCardPopover {
  buttonText: string
  children: React.ReactNode
  marginLeft?: string
}

export default function CourseContainerPopover({
  buttonText,
  children,
  marginLeft
}: ICreateCardPopover) {
  return (
    <div className='w-full max-w-sm '>
      <Popover className='relative'>
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : ''}
                inline-flex items-center p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500`}
            >
              <p className='text-sm min-w-[60px] font-semibold text-primary-500 hover:text-primary-200 transition-colors duration-150'>
                {buttonText}
              </p>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              {/* Controls the popover div styles on the page */}
              <Popover.Panel
                className={`absolute z-10 ${marginLeft ? marginLeft : 'ml-2'} mt-3 w-screen max-w-xs -translate-x-3/4 transform px-12`}
              >
                <div className='ring-black/5 overflow-hidden rounded-lg bg-offWhite-200 shadow-lg ring-2'>
                  <div className='relative grid gap-2 p-4 '>
                    <div>
                      <div className=''>{children}</div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
