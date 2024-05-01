import Link from 'next/link'

export default function NotFound() {
  return (
    <main className='flex flex-col mt-24 text-center align-middle justify-center'>
      <h2 className='text-xl'>Error 404</h2>
      <p>We cannot find the page you are looking for.</p>
      <p>
        Go back to the <Link className='text-primary' href='/reactor/dashboard'>Dashboard</Link>
      </p>
    </main>
  )
}
