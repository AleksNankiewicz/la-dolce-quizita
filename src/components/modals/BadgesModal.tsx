import { getLevels } from '@/lib/actions'
import { LevelProps, UserProps } from '@/types/data'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

const BadgesModal = ({ points }: { points: number }) => {
  const [allLevels, setAllLevels] = useState<LevelProps[]>([])
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  console.log(points)
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    rtl: true,
    afterChange: (index: number) => setCurrentSlide(index),
  }

  const fetchLevels = async () => {
    const levels = await getLevels()
    setAllLevels(levels)
  }

  useEffect(() => {
    fetchLevels()
  }, [])

  if (allLevels.length == 0) return

  return (
    <div className="fixed left-0 top-12 bg-slate-800 w-full h-screen flex flex-col items-center justify-evenly pb-36">
      <div className=" text-2xl  ">Wybierz swoją odznakę</div>

      <div className="w-full ">
        <Slider {...settings}>
          {allLevels.map((level: LevelProps) => (
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
        {points <= Number(allLevels[currentSlide].threshold) ? (
          <Button>Zmień odznakę</Button>
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
      <X className=" absolute right-5 top-5 text-red-400" />
    </div>
  )
}

export default BadgesModal
