import { getUserByEmail } from '@/lib/actions'
import { UserProps } from '@/types/data'
import Image from 'next/image'
import React from 'react'

const UserBadge = ({ email }: { email: string }) => {
  const [user, setUser] = React.useState<UserProps>()

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserByEmail(email)
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [email])
  return (
    user?.selectedBadge && (
      <Image
        src={user?.selectedBadge}
        width={20}
        height={20}
        alt={'UserBadge'}
        className="w-6 h-6 block "
      />
    )
  )
}

export default UserBadge
