'use client'
import StatsBlock from '@/components/layouts/StatsBlock'
import { Button } from '@/components/ui/button'
import { Pen } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const ProfilePage = () => {
  return (
    <div className="w-full flex-col items-center text-center space-y-4 px-3">
      <div className="relative w-full flex justify-center p-5">
        <div className="absolute bg-purple-600 flex p-1 rounded-xl right-28">
          Edytuj <Pen />
        </div>
        <Image
          src={'/noavatar.png'}
          width={200}
          height={200}
          alt="profile"
          className="rounded-full"
        />
      </div>

      <div className="text-2xl">Aleks</div>
      <StatsBlock />
      <Button onClick={() => signOut()} className="w-full text-2xl py-7">
        Wyloguj się
      </Button>
    </div>
  )
}

export default ProfilePage
