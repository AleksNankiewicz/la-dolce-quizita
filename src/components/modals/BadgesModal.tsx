import { getLevels, setBadge } from '@/lib/actions'
import { LevelProps, UserProps } from '@/types/data'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

const BadgesModal = ({
  selectedBadge,
  email,
  points,
  onClose,
}: {
  email: string
  selectedBadge: string | undefined
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

    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  }

  const fetchLevels = async () => {
    const levels = await getLevels()
    setAllLevels(levels)
    const updatedLevels = [...levels]
    if (updatedLevels.length >= 2) {
      const temp = updatedLevels[0]
      updatedLevels[0] = updatedLevels[1]
      updatedLevels[1] = temp
    }
    setSlides(updatedLevels)
  }

  useEffect(() => {
    fetchLevels()
  }, [])

  const handleBadgeChange = async () => {
    const selectedBadge = allLevels[currentSlide].badge

    console.log(allLevels[currentSlide])
    console.log(currentSlide)

    const updatedBadge = await setBadge(email, selectedBadge)

    window.location.reload()
  }

  if (allLevels.length == 0) return

  return (
    <div className="fixed left-0 top-12 bg-slate-800 w-full h-screen flex flex-col items-center justify-evenly pb-36">
      <div className=" text-2xl  ">Wybierz swoją odznakę</div>

      <div className="w-full ">
        <Slider {...settings}>
          {slides.map((level: LevelProps) => (
            <div
              key={level.number}
              className=" w-40 h-40 flex justify-center items-center relative"
            >
              <Image
                alt="badge"
                src={level.badge}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="">
        {points >= Number(allLevels[currentSlide].threshold) ? (
          <Button onClick={() => handleBadgeChange()}>Zmień odznakę</Button>
        ) : (
          <p>
            Żeby odblokować tę odznakę musisz zdobyć jeszcze
            <span className="text-red-400">
              {' '}
              {Number(allLevels[currentSlide].threshold) - points}{' '}
            </span>
            punktów
          </p>
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
