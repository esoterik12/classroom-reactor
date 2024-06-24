import Loading from "@/components/shared/Loading";

export default function LoadingCreateCourse() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section className='mx-6 flex flex-col items-center justify-center'>
      <div>
        <Loading text="Loading..." />
      </div>
    </section>
  )
}
