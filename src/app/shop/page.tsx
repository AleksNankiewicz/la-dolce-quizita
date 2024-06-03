import ShopItems from '@/components/shop/ShopItems'
import SmallShopItemBlock from '@/components/shop/SmallShopItemBlock'
import { getShopItems } from '@/lib/actions'
import { ShopItemProps } from '@/types/data'
import React from 'react'

const ShopPage = async () => {
  const shopItems: ShopItemProps[] = await getShopItems()

  return (
    <main className=" w-full p-4 grid grid-cols-2 gap-3 md:grid-cols-4">
      <ShopItems shopItems={JSON.parse(JSON.stringify(shopItems))} />
    </main>
  )
}

export default ShopPage
