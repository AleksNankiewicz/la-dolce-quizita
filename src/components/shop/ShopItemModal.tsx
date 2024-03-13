import { motion } from 'framer-motion'
import Backdrop from '../modals/Backdrop'
import { ShopItemProps, UserProps } from '@/types/data'
import Image from 'next/image'
import { Button } from '../ui/button'
import { buyShopItem } from '@/lib/actions'
import ButtonWithAnimation from '../animations/ButtonWithAnimation'
import { Coins } from 'lucide-react'

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
}

const ShopItemModal = ({
  handleClose,
  shopItem,
  user,
  setRefresh,
}: {
  handleClose: (isModalOpen: boolean) => void
  shopItem: ShopItemProps
  user: UserProps | undefined
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const handleBuy = async (shopItem: ShopItemProps) => {
    if (!user?.email) return

    await buyShopItem(shopItem, user?.email)
    setRefresh(true)
    handleClose(false)
  }
  return (
    <Backdrop onClick={() => handleClose(false)}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal w-[clamp(50%,700px,90%)] h-[min(50%,300px)] mx-auto px-8 py-0 rounded-xl flex flex-col items-center gap-2"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p>{shopItem.title && shopItem.title}</p>
        <div className="w-full h-2/3 relative">
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

        {shopItem.price && (
          <div className=" flex text-2xl relative">
            <p className=""> {shopItem.price}</p>
            <Coins className="absolute -right-1/2" />
          </div>
        )}

        {user && (
          <ButtonWithAnimation
            label="Kup"
            onClick={() => handleBuy(shopItem)}
          />
        )}
      </motion.div>
    </Backdrop>
  )
}

export default ShopItemModal
