import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className='flex m-12 justify-center'>
      <SignIn redirectUrl='/reactor' />
    </section>
  )
}
