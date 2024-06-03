import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Tooltip } from 'react-tooltip'
import { getSubCategories } from '@/lib/actions'
import { X } from 'lucide-react'
import {
  startedLevels,
  startedModes,
  startedQuestionsAmount,
} from '@/lib/starters'
const EditableModal = ({
  onClose,
  data,
  permissions,
}: {
  onClose: (values: any) => void
  data: any
  permissions: any
}) => {
  console.log(data)

  const mappedLevels = startedLevels.map((level) => {
    // Reset isSelected to false for all levels
    const updatedLevel = { ...level, isSelected: false }

    if (level.title === data.level) {
      updatedLevel.isSelected = true
    }

    return updatedLevel
  })

  const mappedModes = startedModes.map((mode) => {
    // Reset isSelected to false for all modes
    const updatedMode = { ...mode, isSelected: false }

    if (data.access === mode.access) {
      updatedMode.isSelected = true
    }

    return updatedMode
  })

  const mappedAmounts = startedQuestionsAmount.map((amount) => {
    // Reset isSelected to false for all amounts
    const updatedAmount = { ...amount, isSelected: false }

    if (data.questionsPercent === amount.amount) {
      updatedAmount.isSelected = true
    }

    return updatedAmount
  })

  const [levels, setLevels] = useState<any>(mappedLevels)

  console.log(mappedLevels)
  const [modes, setModes] = useState<any>(mappedModes)
  const [categories, setCategories] = useState<any>()
  const [questionsAmount, setQuestionsAmount] = useState<any>(mappedAmounts)

  const getCategories = async () => {
    try {
      const cats = await getSubCategories()
      if (cats) {
        const startedCats = cats.map((cat) => {
          const updatedCat = { ...cat, isSelected: false }

          if (data.categorySlug === cat.slug) {
            updatedCat.isSelected = true
          }
          return updatedCat
        })
        // const matchedCats = startedCats.filter((startedCat) =>
        //   permissions.some(
        //     (perm: any) => perm.categorySlug === startedCat.categorySlug
        //   )
        // )

        setCategories(startedCats)
      } else {
        console.error('Error: No categories fetched')
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    console.log(permissions[0])

    if (!permissions) return

    //To enable perrmissions uncomment

    // if (permissions[0] !== 'Any') {
    //   let startedCats = permissions.map((cat: any) => ({
    //     ...cat,
    //     isSelected: false,
    //   }))

    //   console.log(permissions.length)
    //   if (permissions.length == 1) {
    //     startedCats = permissions.map((cat: any) => ({
    //       ...cat,
    //       isSelected: true,
    //     }))
    //   }
    //   const matchedCats = startedCats.filter((startedCat: any) =>
    //     permissions.some(
    //       (perm: any) => perm.categorySlug === startedCat.categorySlug
    //     )
    //   )
    //   //clg

    //   if (permissions.length == 1) {
    //     const selectedPermission = permissions[0]
    //     setCategories
    //   }
    //   setCategories(matchedCats)
    // } else {
    //   getCategories()
    // }

    getCategories()
  }, [permissions])
  console.log(categories)

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
    const selectedCat = categories.find((cat: any) => cat.isSelected)
    const selectedCatSlug = selectedCat
      ? selectedCat.slug || selectedCat.categorySlug
      : undefined
    const selectedCatName = selectedCat
      ? selectedCat.title || selectedCat.categoryName
      : undefined
    const selectedAmount = parseFloat(
      questionsAmount.find((amount: any) => amount.isSelected)?.amount
    )

    onClose({
      level: selectedLevel,
      access: selectedMode,
      categorySlug: selectedCatSlug,
      categoryName: selectedCatName,
      questionsPercent: selectedAmount,
    })
  }

  return (
    <div className=" w-full md:max-w-screen-xl h-full fixed left-0 md:left-1/2 md:-translate-x-1/2 top-0 bg-slate-900  md:py-14  flex flex-col gap-5 overflow-y-scroll  md:pb-16">
      <div className="w-full flex justify-center flex-col items-center gap-4 mt-24">
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
                key={cat.title || cat.categoryName}
                className={`border ${cat.color} ${
                  cat.isSelected && 'border-4'
                }`}
                disabled={categories.length == 1}
              >
                {cat.title || cat.categoryName}
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
        className="absolute right-[20px] top-[60px] text-red-400 hover:text-red-300 cursor-pointer"
        onClick={handleClose}
      >
        <X />
      </div>
    </div>
  )
}

export default EditableModal
