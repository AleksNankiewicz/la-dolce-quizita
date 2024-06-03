import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const HomeSeeAll = ({ path, label }: { path: string; label: string }) => {
  return (
    <div className=" text-xl md:text-2xl text-white  col-span-2 w-full flex justify-center md:col-span-4 pt-4  ">
      <Link href={path} className="no-underline">
        <Button className="rounded-2xl bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 ">
          {label}
        </Button>
      </Link>
    </div>
  )
}

export default HomeSeeAll
