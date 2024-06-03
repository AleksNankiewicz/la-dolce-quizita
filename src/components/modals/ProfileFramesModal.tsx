import { getLevels, setBadge, setProfileFrame } from '@/lib/actions'
import { LevelProps, UserProps } from '@/types/data'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

const BadgesModal = ({
  selectedProfileFrame,
  userImg,
  email,
  points,
  onClose,
}: {
  email: string
  userImg: string | undefined
  selectedProfileFrame: string | undefined
  points: number
  onClose: (isOpen: boolean) => void
}) => {
  const [allLevels, setAllLevels] = useState<LevelProps[]>([])
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [slides, setSlides] = useState<LevelProps[]>([])
  console.log(points)
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    rtl: true,
    initialSlide: slides.length - 1,

    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  }

  const fetchLevels = async () => {
    const levels = await getLevels()

    setAllLevels(levels)
    levels.sort((a, b) => a.number - b.number)
    const shiftedLevels = levels.slice(4).concat(levels.slice(0, 4)).reverse()

    setSlides(shiftedLevels)
  }

  useEffect(() => {
    fetchLevels()
  }, [])

  const handleBadgeChange = async () => {
    const selectedProfileFrame = allLevels[currentSlide].profileFrame

    console.log(allLevels[currentSlide])
    console.log(currentSlide)

    const updatedBadge = await setProfileFrame(email, selectedProfileFrame)

    window.location.reload()
  }

  if (allLevels.length == 0) return

  return (
    <div className="fixed left-0 top-12 bg-slate-800 w-full h-screen flex flex-col items-center justify-evenly pb-36">
      <div className=" text-2xl  ">Wybierz swoją obramówkę</div>

      <div className="w-full ">
        <Slider {...settings}>
          {slides.map((level: LevelProps) => (
            <div
              key={level.number}
              className=" w-40 h-40 flex justify-center items-center relative"
            >
              <Image
                alt="badge"
                src={level.profileFrame}
                fill
                className="object-contain absolute z-20"
              />
              <Image
                alt="badge"
                src={userImg ? userImg : '/noavatar.png'}
                width={150}
                height={150}
                className="w-24 h-24  absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="">
        {points >= Number(allLevels[currentSlide].threshold) ? (
          <Button onClick={() => handleBadgeChange()}>Zmień obramówkę</Button>
        ) : (
          <Button disabled>
            Żeby odblokować tę obramówkę musisz zdobyć jeszcze
            <span className="text-red-400 mx-1">
              {' '}
              {Number(allLevels[currentSlide].threshold) - points}{' '}
            </span>
            punktów
          </Button>
        )}
      </div>
      <X
        className=" absolute right-5 top-5 text-red-400 cursor-pointer"
        onClick={() => onClose(false)}
      />
    </div>
  )
}

export default BadgesModal
