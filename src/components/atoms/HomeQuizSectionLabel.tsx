import React from 'react'

const HomeQuizSectionLabel = ({ title }: { title: string }) => {
  return (
    <div className=" text-2xl text-white p4 col-span-2 md:col-span-4 w-full ">
      <h1 className="">{title}</h1>
    </div>
  )
}

export default HomeQuizSectionLabel
