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
    user?.img && (
      <div className="rounded-full w-10 h-10 relative">
        <Image
          src={user.img}
          alt="profilepic"
          width={50}
          height={50}
          className="rounded-full w-10 h-10"
        />
        <div className="absolute right-0 bottom-0 bg-white rounded-full w-4 h-4 text-xs text-center text-purple-700 font-bold">
          <p className="">{user.level ? user.level : 1}</p>
        </div>
      </div>
    )
  )
}

export default UserImage
