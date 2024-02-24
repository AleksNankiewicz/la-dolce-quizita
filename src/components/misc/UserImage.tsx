import { getUserByEmail } from '@/lib/actions'
import Image from 'next/image'
import React from 'react'

const UserImage = ({ email }: { email: string }) => {
  const [user, setUser] = React.useState<any>(null)

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

 // console.log(user)
  return (
    user && (
      <Image
        src={user.img}
        alt="profilepic"
        width={30}
        height={30}
        className="rounded-full"
      />
    )
  )
}

export default UserImage
