import { getUserByEmail } from '@/lib/actions'
import useNavStore from '@/lib/store'
import { UserProps } from '@/types/data'
import Image from 'next/image'
import React from 'react'

const UserNavbar = ({ email }: { email: string }) => {
  const [user, setUser] = React.useState<UserProps>()
  const refreshNavbar = useNavStore((state) => state.refresh)
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
  }, [email, refreshNavbar])
  return (
    <>
      <div className="rounded-full w-12 h-12 relative flex justify-center items-center">
        <Image
          src={user?.img ? user?.img : '/noavatar.png'}
          alt="profilepic"
          width={50}
          height={50}
          className="rounded-full w-8 h-8"
        />

        {user?.selectedProfileFrame && (
          <Image
            src={user.selectedProfileFrame}
            alt="profilepic"
            width={70}
            height={70}
            className=" absolute top-0 left-0 w-12 h-12"
          />
        )}
        <div className="absolute right-0 bottom-0 bg-white rounded-full w-4 h-4 text-xs text-center text-purple-700 font-bold border border-purple-700">
          <p className="">{user?.level ? user?.level : 1}</p>
        </div>
      </div>

      {user?.selectedBadge && (
        <Image
          src={user?.selectedBadge}
          width={20}
          height={20}
          alt={'UserBadge'}
          className="w-6 h-6 hidden md:block "
        />
      )}
    </>
  )
}

export default UserNavbar
