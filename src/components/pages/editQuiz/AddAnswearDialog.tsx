'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button, buttonVariants } from '../../ui/button'

import { Separator } from '../../ui/separator'
import { cn } from '@/lib/utils'

import { TAnswerButtonColors } from '@/lib/constants/answerButtonColors'
import { Switch } from '../../ui/switch'
import { Plus } from 'lucide-react'
import ContentEditable from '../../ui/ContentEditable'

type AddAnswearProps = {
  addAnswear: (title: string, isCorrect: boolean) => void

  color: TAnswerButtonColors
}
const AddAnswearDialog = ({ addAnswear, color }: AddAnswearProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [title, setTitle] = useState('')
  const [error, setError] = useState(false)
  const handleCheckChange = () => {
    isCorrect ? setIsCorrect(false) : setIsCorrect(true)
  }
  const handleTitleChange = (newTilte: string) => {
    setTitle(newTilte)
  }

  const saveChanges = () => {
    if (!title) {
      return setError(true)
    }
    setIsOpen(false)
    addAnswear(title, isCorrect)
    setTitle(''), setIsCorrect(false)
    setError(false)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={cn(
          buttonVariants(),
          'w-full  col-span-2 py-7 min-h-[84px] md:hidden'
        )}
      >
        <Plus />
      </DialogTrigger>
      <DialogContent className="min-w-[80%] w-[80%]  rounded-3xl ">
        <DialogHeader className="relative">
          <DialogTitle className="font-bold">Dodaj Odpowiedź</DialogTitle>
        </DialogHeader>
        <Separator />

        <ContentEditable
          onBlur={handleTitleChange}
          value={''}
          error={error}
          errorMessage="Odpowiedź nie może być pusta"
          className={cn(
            // buttonVariants(),
            `p-7   
             sm:text-center  min-h-[84px]  text-xl  flex sm:justify-center items-center rounded-md shadow-[0px_5px_0px_0px_#00000024] text-white `,
            color.background,
            color.shadow
          )}
        />

        <div className="flex gap-2 justify-between">
          <p className="font-semibold">Poprawna Odpowiedź</p>
          <Switch
            checked={isCorrect}
            onCheckedChange={handleCheckChange}
            className="bg-blue-500"
          />
        </div>
        <Separator />
        <DialogFooter>
          <Button onClick={saveChanges} className="rounded-full w-full">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddAnswearDialog
