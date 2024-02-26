import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Tooltip } from 'react-tooltip'
import { getSubCategories } from '@/lib/actions'
import { X } from 'lucide-react'
const EditableModal = ({ onClose }: { onClose: (values: any) => void }) => {
  const startedLevels = [
    {
      title: 'Łatwy',
      color: 'border-green-400',
      isSelected: true,
    },
    {
      title: 'Średni',
      color: 'border-blue-400',
      isSelected: false,
    },
    {
      title: 'Trudny',
      color: 'border-red-400',
      isSelected: false,
    },
    {
      title: 'Ekspert',
      color: 'border-purple-400',
      isSelected: false,
    },
  ]
  const startedModes = [
    {
      title: 'Wszyscy gracze',
      access: 'All',
      color: 'border-green-400',
      isSelected: true,
    },
    {
      title: 'Tylko zalogowani',
      access: 'Logged',
      color: 'border-blue-400',
      isSelected: false,
    },
    {
      title: 'Konkurs',
      access: 'Competetive',
      color: 'border-red-400',
      isSelected: false,
    },
    {
      title: 'Konkurs dla zalogowanych',
      access: 'Competetive logged',
      color: 'border-purple-400',
      isSelected: false,
    },
  ]

  const startedQuestionsAmount = [
    {
      title: '20%',
      amount: 25,
      isSelected: false,
    },
    {
      title: '50%',
      amount: 50,
      isSelected: false,
    },
    {
      title: '75%',
      amount: 75,
      isSelected: false,
    },
    {
      title: '100%',
      amount: 100,
      isSelected: true,
    },
  ]

  const [levels, setLevels] = useState<any>(startedLevels)
  const [modes, setModes] = useState<any>(startedModes)
  const [categories, setCategories] = useState<any>()
  const [questionsAmount, setQuestionsAmount] = useState<any>(
    startedQuestionsAmount
  )

  const getCategories = async () => {
    try {
      const cats = await getSubCategories()
      if (cats) {
        const startedCats = cats.map((cat) => ({ ...cat, isSelected: false }))
        setCategories(startedCats)
      } else {
        console.error('Error: No categories fetched')
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleLevels = (index: number) => {
    const resetedLevels = levels.map((level: any) => (level.isSelected = false))
    setLevels(resetedLevels)
    const updatedLevels = [...levels]

    updatedLevels[index].isSelected = true

    setLevels(updatedLevels)
  }
  const handleModes = (index: number) => {
    const resetedModes = modes.map((mode: any) => (mode.isSelected = false))
    setModes(resetedModes)
    const updatedModes = [...modes]

    updatedModes[index].isSelected = true

    setModes(updatedModes)
  }
  const handleCats = (index: number) => {
    const resetedCats = categories.map((cat: any) => (cat.isSelected = false))
    setCategories(resetedCats)
    const updatedCats = [...categories]

    updatedCats[index].isSelected = true

    setCategories(updatedCats)
  }
  const handleQuestionsAmount = (index: number) => {
    const resetedAmounts = questionsAmount.map(
      (amount: any) => (amount.isSelected = false)
    )
    setQuestionsAmount(resetedAmounts)
    const updatedAmounts = [...questionsAmount]

    updatedAmounts[index].isSelected = true

    setQuestionsAmount(updatedAmounts)
  }

  const handleClose = () => {
    const selectedLevel = levels.find((level: any) => level.isSelected)?.title
    const selectedMode = modes.find((mode: any) => mode.isSelected)?.access
    const selectedCat = categories.find((cat: any) => cat.isSelected)?.slug
    const selectedAmount = questionsAmount.find(
      (amount: any) => amount.isSelected
    )?.amount

    onClose({
      level: selectedLevel,
      access: selectedMode,
      categorySlug: selectedCat,
      questionsAmount: selectedAmount,
    })
  }

  return (
    <div className="w-full h-full fixed left-0 top-0 bg-slate-900  py-14 flex flex-col gap-5">
      <div className="w-full flex justify-center flex-col items-center gap-4">
        <div className="">Poziom Trudności</div>

        <div className=" flex gap-4 flex-wrap justify-center">
          {levels.map((level: any, index: number) => (
            <Button
              onClick={() => handleLevels(index)}
              key={level.title}
              className={`border ${level.color} ${
                level.isSelected && 'border-4'
              }`}
            >
              {level.title}
            </Button>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center flex-col items-center gap-4">
        <div
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Hello world!"
          data-tooltip-place="bottom"
        >
          Dostęp
        </div>
        <Tooltip id="my-tooltip" className="bg-slate-950" opacity={1} />

        <div className=" flex gap-4 flex-wrap justify-center">
          {modes.map((mode: any, index: number) => (
            <Button
              onClick={() => handleModes(index)}
              key={mode.title}
              className={`border ${mode.color} ${
                mode.isSelected && 'border-4'
              }`}
            >
              {mode.title}
            </Button>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center flex-col items-center gap-4">
        <div className="">Kategoria</div>
        <div className=" flex gap-4 flex-wrap justify-center">
          {categories &&
            categories.map((cat: any, index: number) => (
              <Button
                onClick={() => handleCats(index)}
                key={cat.title}
                className={`border ${cat.color} ${
                  cat.isSelected && 'border-4'
                }`}
              >
                {cat.title}
              </Button>
            ))}
        </div>
      </div>
      <div className="w-full flex justify-center flex-col items-center gap-4">
        <div className="">Ilość wyświetlanych pytań</div>
        <div className=" flex gap-4 flex-wrap justify-center">
          {questionsAmount &&
            questionsAmount.map((amount: any, index: number) => (
              <Button
                onClick={() => handleQuestionsAmount(index)}
                key={amount.title}
                className={`border ${amount.color} ${
                  amount.isSelected && 'border-4'
                }`}
              >
                {amount.title}
              </Button>
            ))}
        </div>
      </div>

      <div
        className="absolute right-[20px] text-red-400 hover:text-red-300 cursor-pointer"
        onClick={handleClose}
      >
        <X />
      </div>
    </div>
  )
}

export default EditableModal
