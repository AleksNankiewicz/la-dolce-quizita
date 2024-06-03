import Link from 'next/link'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" mt-1 ml-1">
      <div className="  w-full flex  justify-center rounded-xl gap-2  items-center  px-2">
        <Link
          href={'/admin/users'}
          className=" border text-center w-full py-1 rounded-md"
        >
          Urzytkownicy
        </Link>
        <Link
          href={'/admin/categories'}
          className=" border text-center w-full py-1  rounded-md"
        >
          Kategorie
        </Link>
      </div>

      {children}
    </div>
  )
}

export default RootLayout
