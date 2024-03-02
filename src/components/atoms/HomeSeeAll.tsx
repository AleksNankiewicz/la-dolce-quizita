import Link from 'next/link'
import React from 'react'

const HomeSeeAll = ({ path, label }: { path: string; label: string }) => {
  return (
    <div className=" text-xl md:text-2xl text-white p4 col-span-2 w-full flex justify-center md:col-span-4 pt-7">
      <Link href={path} className="no-underline">
        {label}
      </Link>
    </div>
  )
}

export default HomeSeeAll
