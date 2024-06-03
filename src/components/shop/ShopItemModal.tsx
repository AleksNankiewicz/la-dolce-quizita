import { motion } from 'framer-motion'
import Backdrop from '../modals/Backdrop'
import { ShopItemProps, UserProps } from '@/types/data'
import Image from 'next/image'
import { Button } from '../ui/button'
import { buyShopItem } from '@/lib/actions'
import ButtonWithAnimation from '../animations/ButtonWithAnimation'
import { BadgeDollarSign, Coins, X } from 'lucide-react'
import { formatNumber } from '@/lib/utils'
import useNavStore from '@/lib/store'

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
  const refreshNavbar = useNavStore((state) => state.setRefresh)

  const handleBuy = async (shopItem: ShopItemProps) => {
    if (!user?.email) return

    await buyShopItem(shopItem, user?.email)
    setRefresh(true)
    refreshNavbar(true)
    handleClose(false)
  }
  return (
    <Backdrop onClick={() => handleClose(false)}>
      <div className="absolute right-[40px] top-[100px] ">
        <X
          size={40}
          className="cursor-pointer text-red-400"
          onClick={() => handleClose(false)}
        />
      </div>
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
          <div className=" flex text-2xl relative items-center gap-1">
            <p className="">{formatNumber(shopItem.price)}</p>
            <BadgeDollarSign size={20} />
          </div>
        )}

        {user &&
          (user.points > shopItem.price ? (
            <ButtonWithAnimation
              label="Kup"
              onClick={() => handleBuy(shopItem)}
            />
          ) : (
            <>
              <Button disabled>Kup</Button>
              <p className="text-center">
                Musisz zdobyć jeszcze{' '}
                <span className="text-orange-400 text-xl">
                  {shopItem.price - user.points}{' '}
                </span>{' '}
                punktów, żeby odblokować tą odznakę
              </p>
            </>
          ))}
      </motion.div>
    </Backdrop>
  )
}

export default ShopItemModal
