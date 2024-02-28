import FindUser from '@/components/misc/FindUser'
import UserSession from '@/components/misc/UserSession'

const ProfilePage = async ({ params }: { params: any }) => {
  const { slug } = params

  return <UserSession />
}

export default ProfilePage
