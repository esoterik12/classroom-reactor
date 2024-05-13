export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section className='container mb-28 flex flex-col items-center md:mb-12'>
      <div className='text-center text-lg font-semibold text-gray-700 dark:text-offWhite-500'>
        Search Classroom Reactor
      </div>
      <div>
        <p className="mt-6 text-gray-500">Loading page...</p>
      </div>
    </section>
  )
}
