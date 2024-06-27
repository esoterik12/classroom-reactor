import BasicPageContainer from '@/components/containers/BasicPageContainer'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'
import CreateWordScramble from '@/components/forms/CreateWordScramble'

const WordScramblePage = async () => {
  const user = await currentUser()
  if (!user) return null

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')

  // queen, well, egg, real, trap, yes, up, in, octopus

  return (
    <BasicPageContainer>
      <CreateWordScramble
        initialFormValues={{ title: '', text: '' }}
        userId={userInfo._id.toString()}
        createType='wordScramble'
      />
    </BasicPageContainer>
  )
}

export default WordScramblePage
