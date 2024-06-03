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
import SmallShopItemBlock from './SmallShopItemBlock'

const ShopItems = ({ shopItems }: { shopItems: ShopItemProps[] }) => {
  const session = useSession()

  const [email, setEmail] = useState('')
  const [user, setUser] = React.useState<UserProps>()
  const [items, setItems] = useState(shopItems)
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    if (session.status == 'authenticated') {
      const user = session.data.user as sessionUserProps
      setEmail(user.email ?? null)
    }
  }, [session?.data, session?.status])

  React.useEffect(() => {
    if (refresh) {
      setRefresh(false)
    }
    const fetchUser = async () => {
      try {
        const user = await getUserByEmail(email)
        setUser(JSON.parse(JSON.stringify(user)))
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [email, refresh])

  const plainUser = user
    ? {
        username: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        img: user.img,
        points: user.points,
        gamePlayed: user.gamePlayed,
        gameWon: user.gameWon,
        streak: user.streak,
        lastGameDate: user.lastGameDate,
        permissions: user.permissions,
        selectedBadge: user.selectedBadge,
        selectedProfileFrame: user.selectedProfileFrame,
        level: user.level,
        isVerified: user.isVerified,
        slug: user.slug,
        quizesPlayed: user.quizesPlayed,
        badges: user.badges,
        quizCoins: user.quizCoins,
      }
    : undefined

  return shopItems.map((shopItem) => (
    <SmallShopItemBlock
      shopItem={JSON.parse(JSON.stringify(shopItem))}
      user={plainUser}
      setRefresh={setRefresh}
      key={shopItem.title}
    />
  ))
}

export default ShopItems
