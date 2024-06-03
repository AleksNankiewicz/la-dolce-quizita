import React from 'react'
import { getUserByEmail } from '@/lib/actions'
import EditableProfile from '../editables/EditableProfile'
import Loading from '@/app/loading'
import { unstable_noStore as noStore } from 'next/cache'
const FindUser = ({ email }: { email: string }) => {
  const [user, setUser] = React.useState<any>(null)

  React.useEffect(() => {
    const fetchUser = async () => {
      noStore()
      try {
        const user = await getUserByEmail(email)
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [email])

  return user ? <EditableProfile user={user} /> : <Loading />
}

export default FindUser
