import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type HomeQuizSectionLabelProps = {
  title: string
  seeMoreLink?: string
}

const HomeQuizSectionLabel = ({
  title,
  seeMoreLink,
}: HomeQuizSectionLabelProps) => {
  return (
    <div className="font-semibold text-2xl  py-4 col-span-2 md:col-span-4 w-full flex justify-between  items-center">
      <h1 className="">{title}</h1>
      {seeMoreLink && (
        <Link
          href={seeMoreLink}
          className="text-primary font-medium text-xl flex items-center gap-1"
        >
          <p className="md:hidden">Więcej</p>
          <p className="hidden md:block">Zobacz więcej</p>
          <ArrowRight />
        </Link>
      )}
    </div>
  )
}

export default HomeQuizSectionLabel
