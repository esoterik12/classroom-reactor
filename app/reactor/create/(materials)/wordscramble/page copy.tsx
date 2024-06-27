import BasicPageContainer from '@/components/containers/BasicPageContainer'
import CreateForm from '@/components/forms/CreateForm'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'

const WordScramblePage = async () => {
  const user = await currentUser()
  if (!user) return null

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')
  console.log('userInfo', userInfo)

  console.log('user.id', userInfo.id)

  return (
    <BasicPageContainer>
      <CreateForm
        initialFormValues={{ title: '', text: '' }}
        userId={userInfo._id.toString()}
        username={userInfo.username}
        userImage={userInfo.image}
        createType='wordScramble'
      />
    </BasicPageContainer>
  )
}

export default WordScramblePage
