import Link from 'next/link'
import React from 'react'

const HomeSeeAll = ({ path, label }: { path: string; label: string }) => {
  return (
    <div className=" text-xl text-white p4 col-span-2 w-full flex justify-center md:col-span-4">
      <Link href={path} className="underline">
        {label}
      </Link>
    </div>
  )
}

export default HomeSeeAll
