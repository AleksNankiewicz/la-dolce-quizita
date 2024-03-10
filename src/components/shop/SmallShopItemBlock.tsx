'use client'
import { getUserByEmail } from '@/lib/actions'
import {
  LevelProps,
  ShopItemProps,
  UserProps,
  sessionUserProps,
} from '@/types/data'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'

const SmallShopItemBlock = ({ shopItem }: { shopItem: ShopItemProps }) => {
  const session = useSession()

  const [isUserLogged, setIsUserLogged] = useState(false)

  const [email, setEmail] = useState('')

  useEffect(() => {
    if (session.status == 'authenticated') {
      setIsUserLogged(true)
      const user = session.data.user as sessionUserProps
      setEmail(user.email ?? null)
    }
  }, [session?.data, session?.status])

  const [user, setUser] = React.useState<UserProps>()
  const [newShopItem, setShopItem] = useState<ShopItemProps>()

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserByEmail(email)

        setUser(user)
        setShopItem(shopItem)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [email])
  return (
    <div className="relative w-full h-[180px] sm:h-[240px] md:h-[200px] lg:h-[280px] flex justify-center items-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 group:  rounded-xl overflow-hidden">
      {' '}
      <div className="w-full h-2/3 relative mb-16">
        {shopItem.img && (
          <Image
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            blurDataURL={shopItem.img}
            placeholder="blur"
            src={shopItem.img}
            fill
            alt={shopItem.title}
            className="   group-hover:scale-125  duration-300 object-contain"
          />
        )}
      </div>
      {/* {title && <div className="w-full h-1/3 bg-slate-900 ">{title}</div>} */}
      {shopItem.title && (
        <p
          className={`absolute h-[34%] w-full 
   bottom-0 left-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex flex-col justify-center items-center px-2 text-base text-center`}
        >
          {shopItem.title}
          <Button>Kup</Button>
        </p>
      )}
    </div>
  )
}

export default SmallShopItemBlock
