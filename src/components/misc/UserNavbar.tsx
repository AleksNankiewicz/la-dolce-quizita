import { getUserByEmail } from '@/lib/actions'
import useNavStore from '@/lib/store'
import { UserProps } from '@/types/data'
import Image from 'next/image'
import React from 'react'
import { AnimatedNumber } from '../animations/AnimatedNumber'
import { BadgeDollarSign, Coins } from 'lucide-react'
import { formatNumber } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const UserNavbar = ({ email }: { email: string }) => {
  const [user, setUser] = React.useState<UserProps>()
  const refreshNavbar = useNavStore((state) => state.refresh)
  const pathname = usePathname()
  const setRefreshNavbar = useNavStore((state) => state.setRefresh)
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserByEmail(email)
        setUser(user)
        setRefreshNavbar(false)
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
          className={`w-6 h-6 ${
            !pathname.includes('/shop') && 'hidden'
          }  md:block `}
        />
      )}
      {user?.points && pathname.includes('/shop') ? (
        <div className="absolute right-[30%] md:right-[20%]  text-green-400 font-bold h-6 flex justify-center items-center mx-auto w-8 md:w-auto">
          <p>{formatNumber(user.quizCoins)}</p>

          <span className="text-white ml-1">
            {/* <Coins /> */}
            <BadgeDollarSign size={14} />
          </span>
        </div>
      ) : null}
    </>
  )
}

export default UserNavbar
