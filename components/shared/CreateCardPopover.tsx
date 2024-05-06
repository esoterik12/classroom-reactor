'use client'
import { Popover, Transition } from '@headlessui/react'
import { title } from 'process'
import { Fragment } from 'react'

const solutions = [
  {
    name: 'Insights',
    description: 'Measure actions your users take',
    href: '##',
    icon: IconOne
  },
  {
    name: 'Automations',
    description: 'Create your own targeted content',
    href: '##',
    icon: IconTwo
  },
  {
    name: 'Reports',
    description: 'Keep track of your growth',
    href: '##',
    icon: IconThree
  }
]

interface ICreateCardPopover {
  buttonText: string
  title: string
  description: string
  tips: string[]
}

export default function CreateCardPopover({
  buttonText,
  title,
  description,
  tips
}: ICreateCardPopover) {
  return (
    <div className='w-full max-w-sm px-4'>
      <Popover className='relative'>
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : ''}
                hover:text-white group inline-flex items-center rounded-md bg-primary-100 px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200`}
            >
              <span className='text-sm'>{buttonText}</span>
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
              <Popover.Panel className='absolute z-10 ml-7 mt-3 w-screen max-w-xs -translate-x-3/4 transform px-4'>
                <div className='ring-black/5 overflow-hidden rounded-lg bg-primary-100 shadow-lg ring-1'>
                  <div className='relative grid gap-2 p-4 '>
                    <div>
                      {/* Icon (disabled) */}
                      {/* <div className='text-white flex h-10 w-10 shrink-0 items-center justify-center sm:h-12 sm:w-12'>
                          <item.icon aria-hidden='true' />
                        </div> */}

                      {/* Internal Div for each item */}
                      <div className='ml-'>
                        <p className='text-sm font-medium text-primary-600'>
                          {title}
                        </p>
                        <p className='text-sm text-gray-900'>{description}</p>
                        <p className='mt-2 text-sm font-medium text-primary-600'>
                          Tips
                        </p>
                        <ul className='list-disc'>
                        {tips.map(item => (
                          <li className='ml-5 text-sm text-gray-900'>{item}</li>
                        ))}
                        </ul>
                      </div>
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

function IconOne() {
  return (
    <svg
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='48' height='48' rx='8' fill='#FFEDD5' />
      <path
        d='M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z'
        stroke='#FB923C'
        strokeWidth='2'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z'
        stroke='#FDBA74'
        strokeWidth='2'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z'
        stroke='#FDBA74'
        strokeWidth='2'
      />
    </svg>
  )
}

function IconTwo() {
  return (
    <svg
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='48' height='48' rx='8' fill='#FFEDD5' />
      <path
        d='M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27'
        stroke='#FB923C'
        strokeWidth='2'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M18.804 30H29.1963L24.0001 21L18.804 30Z'
        stroke='#FDBA74'
        strokeWidth='2'
      />
    </svg>
  )
}

function IconThree() {
  return (
    <svg
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='48' height='48' rx='8' fill='#FFEDD5' />
      <rect x='13' y='32' width='2' height='4' fill='#FDBA74' />
      <rect x='17' y='28' width='2' height='8' fill='#FDBA74' />
      <rect x='21' y='24' width='2' height='12' fill='#FDBA74' />
      <rect x='25' y='20' width='2' height='16' fill='#FDBA74' />
      <rect x='29' y='16' width='2' height='20' fill='#FB923C' />
      <rect x='33' y='12' width='2' height='24' fill='#FB923C' />
    </svg>
  )
}
