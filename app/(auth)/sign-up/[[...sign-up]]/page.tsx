import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className='m-12 flex justify-center'>
      <SignUp redirectUrl='/reactor' />
    </section>
  )
}
