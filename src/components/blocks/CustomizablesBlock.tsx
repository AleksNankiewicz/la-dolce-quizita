import { Award, Badge, CircleDashed, Coins, Gamepad2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import BadgesModal from '../modals/BadgesModal'
import ProfileFramesModal from '../modals/ProfileFramesModal'
import { ShopItemProps, UserProps } from '@/types/data'
import { getProfileFrames, getShopItems } from '@/lib/actions'
import Image from 'next/image'

interface ICustomizables {
  userBadges: string[]
  userProfileFrames: string[]
  selectedBadge: string
  selectedProfileFrame: string
}

const CustomizablesBlock = ({ user }: { user: UserProps }) => {
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false)
  const [isProfileFramesModalOpen, setIsProfileFramesModalOpen] =
    useState(false)

  const [badges, setBadges] = useState<ShopItemProps[]>()

  const [profileFrames, setProfileFrames] = useState<string[]>()

  const fetchBadges = async () => {
    const items = await getShopItems(3)
    setBadges(items)
    const frames = await getProfileFrames()
    setProfileFrames(frames)
  }

  useEffect(() => {
    fetchBadges()
  }, [])

  useEffect(() => {
    if (isBadgesModalOpen) {
      setIsProfileFramesModalOpen(false)
    }
    if (isProfileFramesModalOpen) {
      setIsBadgesModalOpen(false)
    }
  }, [isBadgesModalOpen, isProfileFramesModalOpen])

  return (
    <div
      className={`text-white text-sm  p4 col-span-2 md:col-span-4 w-full text-center  rounded-xl  relative grid md:grid-cols-4 grid-cols-2 gap-3 `}
    >
      <div
        onClick={() => setIsBadgesModalOpen(true)}
        className="flex flex-col  justify-center items-center border col-span-1  h-36 bg-slate-800 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 rounded-xl  relative cursor-pointer"
      >
        <div className="absolute  lg:translate-x-[33%] bottom-[25px] lg:bottom-auto lg:right-[40px] flex lg:flex-col">
          {badges?.map((badge, index) => (
            <div
              key={index}
              className={`${
                index === 1
                  ? 'lg:absolute lg:-translate-x-[90%] lg:translate-y-[50%] '
                  : ''
              }`}
            >
              <Image
                key={index}
                src={badge.img}
                width={40}
                height={40}
                alt="badge"
                // className={`${index === 2 ? 'mr-5' : ''}`}
              />
            </div>
          ))}
        </div>
        <div className="absolute md:left-[10%] top-1/4 ">
          <p className="sm:text-4xl text-3xl ">Odznaki</p>
        </div>
      </div>
      <div
        onClick={() => setIsProfileFramesModalOpen(true)}
        className="flex flex-col  justify-center items-center  border col-span-1  h-36 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 rounded-xl   relative cursor-pointer"
      >
        <div className="absolute  lg:translate-x-[33%] bottom-[25px] lg:bottom-auto lg:right-[40px] flex lg:flex-col ">
          {profileFrames?.map((frame: string, index: number) => (
            <div
              key={index}
              className={`${
                index === 1
                  ? 'lg:absolute lg:-translate-x-[90%] lg:translate-y-[50%] '
                  : ''
              }`}
            >
              <Image
                key={index}
                src={frame}
                width={40}
                height={40}
                alt="badge"
                // className={`${index === 2 ? 'mr-5' : ''}`}
              />
            </div>
          ))}
        </div>
        <div className="absolute md:left-[10%] top-1/4 ">
          <p className="sm:text-4xl text-3xl ">Ramki</p>
        </div>
      </div>

      {isBadgesModalOpen && (
        <BadgesModal
          onClose={setIsBadgesModalOpen}
          email={user.email}
          points={user.points}
          selectedBadge={user.selectedBadge}
          userBadges={user.badges}
        />
      )}
      {isProfileFramesModalOpen && (
        <ProfileFramesModal
          userImg={user.img}
          onClose={setIsProfileFramesModalOpen}
          email={user.email}
          points={user.points}
          selectedProfileFrame={user.selectedProfileFrame}
        />
      )}
    </div>
  )
}

export default CustomizablesBlock
