import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { getQuizSlugsAndTitles } from '@/lib/actions'
import { quizProps } from '@/types/data'
import Link from 'next/link'
import { ArrowUpRightFromSquare, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const NavbarSearchbar = () => {
  interface IQuiz {
    slug: string
    title: string
  }

  const [staredQuizes, setStartedQuizes] = useState<IQuiz[]>([])
  const [isFetched, setIsFetched] = useState(false)
  const [searchedQuizes, setSearchedQuizes] = useState<IQuiz[]>([])

  const [isModal, setIsModal] = useState(false)
  const [isMobileInput, setIsMobileInput] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const mobileInputRef = useRef<HTMLInputElement>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)

  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (modalRef.current && modalRef.current.contains(event.target as Node)) ||
        (inputRef.current && inputRef.current.contains(event.target as Node)) ||
        (mobileInputRef.current &&
          mobileInputRef.current.contains(event.target as Node))
      ) {
        return
      }

      setIsModal(false)
      setIsMobileInput(false)
    }

    const handleResize = (event: UIEvent) => {
      if (window.innerWidth > 768) {
        setIsMobileInput(false)
      } else {
        if (isModal) {
          setIsMobileInput(true)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('resize', handleResize)
    }
  }, [isModal])

  useEffect(() => {
    if (searchedQuizes.length > 5) {
      const slicedQuizes = searchedQuizes.slice(0, 5)

      setSearchedQuizes(slicedQuizes)
    }
  }, [searchedQuizes])

  const fetchQuizes = async () => {
    const quizes = await getQuizSlugsAndTitles()
    setStartedQuizes(quizes)
  }

  const handleInupt = (e: any) => {
    const searchQuery = e.target.value.toLowerCase()
    if (!isFetched) {
      fetchQuizes()
      setIsFetched(true)
    }

    if (!isFetched) return

    const searchedQuizes = staredQuizes.filter((quiz: IQuiz) => {
      return quiz.title.toLowerCase().includes(searchQuery)
    })

    setSearchedQuizes(searchedQuizes)
    setIsModal(searchedQuizes.length > 0)
  }

  const reset = () => {
    setIsModal(false)
    setIsMobileInput(false)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    if (mobileInputRef.current) {
      mobileInputRef.current.value = ''
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isModal) {
        if (event.key === 'ArrowDown') {
          setSelectedIndex((prevIndex) =>
            prevIndex < searchedQuizes.length - 1 ? prevIndex + 1 : prevIndex
          )
        } else if (event.key === 'ArrowUp') {
          setSelectedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
          )
        }

        if (event.key === 'Enter') {
          router.push(`/quizes/${searchedQuizes[selectedIndex].slug}`)
          reset()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModal, searchedQuizes, selectedIndex])

  console.log(selectedIndex)

  return (
    <>
      <div className="relative w-full md:w-3/4 flex justify-center items-center">
        {!isMobileInput ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-8 h-6 my-auto md:text-purple-400 text-white md:right-3 -right-3 md:border-l-2 pl-2 md:pointer-events-none cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => setIsMobileInput(!isMobileInput)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        ) : (
          <X
            strokeWidth={3}
            onClick={() => setIsMobileInput(!isMobileInput)}
            className="absolute top-0 bottom-0 w-8 h-6 my-auto md:text-purple-400 text-white md:right-3 -right-3 md:border-l-2 pl-2 md:pointer-events-none cursor-pointer"
          />
        )}
        <Input
          ref={inputRef}
          onInput={(e) => handleInupt(e)}
          type="text"
          placeholder="Szukaj quizu..."
          className="pl-4 pr-4 rounded-full focus-visible:ring-1 focus-visible:ring-purple-400 focus-visible:ring-offset-1 bg-white
        h-[100%]
        text-black
        hidden
        md:block
        text-base
        
        "
        />
      </div>

      {isMobileInput && (
        <div className="fixed top-14 left-0 bg-white w-full  h-14 rounded-xl  gap-1 md:hidden">
          <Input
            ref={mobileInputRef}
            onInput={(e) => handleInupt(e)}
            type="text"
            placeholder="Szukaj quizu..."
            className="pl-4  pr-4 rounded-xl focus-visible:ring-1 focus-visible:ring-purple-400 focus-visible:ring-offset-1 bg-white
        h-[100%]
        text-black
        text-xl
        
        "
          />
        </div>
      )}

      {isModal && (
        <div
          ref={modalRef}
          className="fixed top-[120px] md:top-12 md:left-[52%] left-0 md:-translate-x-1/2 bg-white w-full md:w-2/5  p-4 rounded-xl flex flex-col md:gap-1 gap-4 "
        >
          {searchedQuizes.map((quiz: IQuiz, index: number) => (
            <div
              key={quiz.slug}
              className={` ${
                index == selectedIndex && 'bg-gray-400'
              } text-black flex justify-between items-center`}
            >
              <Link href={`/quizes/${quiz.slug}`} onClick={reset}>
                {quiz.title}
              </Link>
              <Link href={`/quizes/${quiz.slug}`} onClick={reset}>
                <ArrowUpRightFromSquare strokeWidth={1} size={16} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default NavbarSearchbar
