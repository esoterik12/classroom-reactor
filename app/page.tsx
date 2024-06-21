import SelectIcon from '@/components/icons/SelectIcon'
import Image from 'next/image'
import Link from 'next/link'

const crudFunctionality = [
  'User Profiles',
  'Creating, editing, and deleting courses.',
  'Adding and editing module pages to courses.',
  'Adding users with different roles to courses.'
]

const techLogos = ['typescript', 'reactjs', 'nextjs', 'mongodb', 'tailwind']

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center p-6'>
      <div className='flex flex-col items-center text-center'>
        <p className='pt-2 text-2xl'>Welcome to Classroom Reactor LMS</p>
        <p className='text-md'>Learning Management System</p>
        <p className='text-sm'>Demo Project by Luke Hide</p>
        <Link
          href='/'
          className='flex flex-row p-2 text-sm transition-colors duration-300 hover:text-primary-300'
        >
          <SelectIcon iconClasses='mr-1 w-5 h-5' iconSelection='github' />
          Github Repository
        </Link>
        <div className='flex flex-row gap-4 p-8 md:gap-8'>
          {techLogos.map(logo => (
            <SelectIcon
              iconClasses='h-12 w-12 md:h-20 md:w-20'
              iconSelection={logo}
              key={logo}
            />
          ))}
        </div>
      </div>
      <div className='grid gap-2 md:grid-cols-2 w-3/4'>
        <div className='p-4'>
          <p>NextJS Server Actions & MongoDB:</p>
          <ul className='ml-6 list-disc'>
            {crudFunctionality.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>{' '}
        </div>
        <div className='p-4'>
          <div className='flex flex-row'>
            <Image width={50} height={50} alt='SlateJS' src='/slatejs.png' />
            <p className='ml-1 mt-1.5'>js - Rich Text Editor:</p>
          </div>
          <ul className='ml-6 list-disc'>
            <li>Custom What You See Is What You Get editor</li>
            <li>
              Manages and toggles text formatting and block-level attributes
            </li>
            <li>Custom HTML serializer</li>
          </ul>
        </div>
        {/* <div className='rounded-r-lg border p-4'>3</div>
        <div className='rounded-r-lg border p-4'>4</div>
        <div className='rounded-r-lg border p-4'>5</div>
        <div className='rounded-r-lg border p-4'>6</div> */}
      </div>
    </main>
  )
}
