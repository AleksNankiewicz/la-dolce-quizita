import SmallShopItemBlock from '@/components/shop/SmallShopItemBlock'
import { getShopItems } from '@/lib/actions'
import { ShopItemProps } from '@/types/data'
import React from 'react'

const ShopPage = async () => {
  const shopItems: ShopItemProps[] = await getShopItems()

  return (
    <main className=" w-full p-4 grid grid-cols-2 gap-3 md:grid-cols-4">
      {shopItems.map((shopItem) => (
        <SmallShopItemBlock
          shopItem={JSON.parse(JSON.stringify(shopItem))}
          key={shopItem.title}
        />
      ))}
    </main>
  )
}

export default ShopPage
