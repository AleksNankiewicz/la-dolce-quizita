import { getLevels, setBadge } from '@/lib/actions'
import { LevelProps, UserProps } from '@/types/data'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { Button } from '../ui/button'
import { ArrowBigLeft, X } from 'lucide-react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import useNavStore from '@/lib/store'

const BadgesModal = ({
  selectedBadge,
  email,
  points,
  onClose,

  userBadges,
}: {
  email: string
  selectedBadge: string | undefined
  points: number
  onClose: (isOpen: boolean) => void
  userBadges: string[]
}) => {
  const [allBadges, setAllBadges] = useState<LevelProps[]>([])
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [slides, setSlides] = useState<LevelProps[]>([])

  const [ownedBadges, setOwnedBadges] = useState(userBadges)

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    rtl: true,
    prevArrow: <ArrowBigLeft />,
    nextArrow: <ArrowBigLeft />,
    initialSlide: slides.length - 1,

    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  }

  const refreshNavbar = useNavStore((state) => state.setRefresh)
  const fetchLevels = async () => {
    const levels = await getLevels()

    const convertedOwnedArr = ownedBadges.map((badge: any) => ({
      number: 0,
      threshold: 0, // Corrected typo
      profileFrame: '',
      badge: badge,
    }))

    const allLevels = levels.concat(convertedOwnedArr)

    setAllBadges(allLevels)
    allLevels.sort((a, b) => a.number - b.number)
    const shiftedLevels = allLevels
      .slice(convertedOwnedArr.length - (4 + userBadges.length))
      .concat(
        allLevels.slice(0, convertedOwnedArr.length - (4 + userBadges.length))
      )
      .reverse()
    //console.log(first)
    setSlides(shiftedLevels)
  }

  useEffect(() => {
    fetchLevels()
  }, [])

  const handleBadgeChange = async () => {
    // return console.log(currentSlide)
    const selectedBadge = allBadges[currentSlide].badge

    // return console.log(allBadges)

    // console.log(allBadges[currentSlide])
    // console.log(currentSlide)

    const updatedBadge = await setBadge(email, selectedBadge)
    refreshNavbar(true)
    // window.location.reload()
  }

  if (allBadges.length == 0) return

  // console.log(allBadges)

  const correctSlidesOrderARR = slides.map((level: LevelProps, index) => (
    <div
      key={level.number || index}
      className=" w-40 h-40 flex justify-center items-center relative"
    >
      <Image alt="badge" src={level.badge} fill className="object-contain" />
    </div>
  ))
  return (
    <div className="fixed left-0 md:left-1/2 md:-translate-x-1/2 top-12 bg-slate-800 w-full max-w-screen-xl h-screen flex flex-col items-center justify-evenly pb-36">
      <div className=" text-2xl  ">Wybierz swoją odznakę</div>

      <div className="w-full ">
        <Slider {...settings}>{correctSlidesOrderARR}</Slider>
      </div>
      <div className="">
        {points >= Number(allBadges[currentSlide].threshold) ? (
          <Button onClick={() => handleBadgeChange()}>
            Wybierz tą odznakę
          </Button>
        ) : (
          <Button disabled>
            Żeby odblokować tę odznakę musisz zdobyć jeszcze
            <span className="text-red-400 mx-1">
              {' '}
              {Number(allBadges[currentSlide].threshold) - points}{' '}
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
