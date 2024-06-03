'use client'
import { getUserByEmail, setBadge } from '@/lib/actions'
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
import { AnimatePresence } from 'framer-motion'
import ShopItemModal from './ShopItemModal'
import useNavStore from '@/lib/store'
import ButtonWithAnimation from '../animations/ButtonWithAnimation'
import { formatNumber } from '@/lib/utils'
import { BadgeDollarSign, Coins } from 'lucide-react'

const SmallShopItemBlock = ({
  shopItem,
  user,
  setRefresh,
}: {
  shopItem: ShopItemProps
  user: UserProps | undefined
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const refreshNavbar = useNavStore((state) => state.setRefresh)

  const handleChange = async (shopItem: ShopItemProps) => {
    if (!user?.email) return

    const item = await setBadge(user?.email, shopItem.img)
    refreshNavbar(true)
    setRefresh(true)
  }

  return (
    <>
      <div className="relative w-full min-h-[230px] sm:min-h-[240px] md:min-h-[200px] lg:min-h-[280px] flex justify-center items-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 group:  rounded-xl overflow-hidden">
        <div className=" hidden absolute right-4 top-4 md:flex items-center gap-1">
          {formatNumber(shopItem.price)}
          <BadgeDollarSign size={14} />
        </div>{' '}
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
          <div
            className={`absolute h-[34%] w-full 
        bottom-0 left-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex flex-col justify-center items-center px-2 text-base text-center`}
          >
            {shopItem.title}

            <div className=" md:hidden flex items-center gap-1">
              {formatNumber(shopItem.price)}
              <BadgeDollarSign size={14} />
            </div>

            {user &&
              (!user.badges.includes(shopItem.img) ? (
                <Button
                  className="text-blue-400"
                  onClick={() => setIsModalOpen(true)}
                >
                  Zobacz
                </Button>
              ) : user.selectedBadge === shopItem.img ? (
                // Render something else here when the condition is true
                <Button disabled>Wybrana</Button>
              ) : (
                <Button
                  onClick={() => handleChange(shopItem)}
                  className="text-green-400"
                >
                  Wybierz
                </Button>
                // Uncomment below to use ButtonWithAnimation
                // <ButtonWithAnimation
                //   onClick={() => handleChange(shopItem)}
                //   label="Wybierz"
                // />
              ))}
          </div>
        )}
      </div>

      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isModalOpen && (
          <ShopItemModal
            setRefresh={setRefresh}
            handleClose={setIsModalOpen}
            shopItem={shopItem}
            user={user && JSON.parse(JSON.stringify(user))}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default SmallShopItemBlock
