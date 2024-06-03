'use client'

import React, { ReactNode } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Social from './Social'
import BackButton from './BackButton'

type CardWrapperProps = {
  children: React.ReactNode
  headerTitle: string
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

const CardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader className=" text-center ">
        <div className="font-bold text-2xl">
          {' '}
          &#128272; {headerTitle} &#128272;
        </div>
        <div className=" text-muted-foreground">{headerLabel}</div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  )
}

export default CardWrapper
