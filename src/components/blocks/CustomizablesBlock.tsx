import { Award, Badge, CircleDashed, Coins, Gamepad2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import BadgesModal from '../modals/BadgesModal'
import ProfileFramesModal from '../modals/ProfileFramesModal'
import { UserProps } from '@/types/data'

interface ICustomizables {
  userBadges: string[]
  userProfileFrames: string[]
  selectedBadge: string
  selectedProfileFrame: string
}

const CustomizablesBlock = ({ user }: { user: UserProps }) =>
  //{
  //   userBadges,
  //   userProfileFrames,
  //   selectedBadge,
  //   selectedProfileFrame,
  // }: ICustomizables
  {
    const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false)
    const [isProfileFramesModalOpen, setIsProfileFramesModalOpen] =
      useState(false)

    useEffect(() => {
      if (isBadgesModalOpen) {
        setIsProfileFramesModalOpen(false)
      }
      if (isProfileFramesModalOpen) {
        setIsBadgesModalOpen(false)
      }
    }, [isBadgesModalOpen, isProfileFramesModalOpen])

    return (
      <div className="text-white text-sm  p4 col-span-2 md:col-span-4 w-full text-center  rounded-xl  relative grid md:grid-cols-4 grid-cols-2 gap-3 ">
        <div
          onClick={() => setIsBadgesModalOpen(true)}
          className="flex flex-col  justify-center items-center border col-span-1  h-36 bg-slate-800 rounded-xl relative cursor-pointer"
        >
          <Badge
            strokeWidth={1}
            className="w-1/2 md:w-1/3 lg:w-1/2 h-1/2 absolute right-0 bottom-0 lg:bottom-1/2 lg:translate-y-1/2 -rotate-45 lg:rotate-0"
          />
          <div className="absolute left-[10%] top-1/4 ">
            <p className="sm:text-4xl text-3xl ">Odznaki</p>
            {/* <p className="sm:text-xl">Wygranych</p> */}
          </div>
        </div>
        <div
          onClick={() => setIsProfileFramesModalOpen(true)}
          className="flex flex-col  justify-center items-center  border col-span-1  h-36 bg-slate-800 rounded-xl relative cursor-pointer"
        >
          <CircleDashed
            strokeWidth={1}
            className="w-1/2 md:w-1/2 lg:w-1/2 h-1/2 absolute right-0 bottom-0 lg:bottom-1/2 lg:translate-y-1/2 -rotate-45 lg:rotate-0"
          />
          <div className="absolute left-[5%] top-1/4 ">
            <p className=" sm:text-3xl text-3xl text-left ">Obramówki</p>
            {/* <p className="sm:text-xl w-1/2">Rozegranych quizów</p> */}
          </div>
        </div>

        {isBadgesModalOpen && (
          <BadgesModal
            onClose={setIsBadgesModalOpen}
            email={user.email}
            points={user.points}
            selectedBadge={user.selectedBadge}
          />
        )}
        {isProfileFramesModalOpen && <ProfileFramesModal />}
      </div>
    )
  }

export default CustomizablesBlock
